import parseAPNG from 'apng-js';
import type { APNG } from 'apng-js';

/** Resting spots in the eventual hover-flight cycle (1 → 2 → 3 → 4 → 5 → 1). */
export type ButterflySpotId = 1 | 2 | 3 | 4 | 5;

export type ButterflyClipId = 'entrance' | 'idle-01' | 'flight-01-02' | 'idle-02';

export type ButterflyClip = {
  id: ButterflyClipId;
  src: string;
  /** When true, clip loops until stopped. */
  loop: boolean;
};

export const BUTTERFLY_CLIPS: Record<ButterflyClipId, ButterflyClip> = {
  entrance: {
    id: 'entrance',
    src: '/animations/butterflyv3/butterfly-entrance.png',
    loop: false,
  },
  'idle-01': {
    id: 'idle-01',
    src: '/animations/butterflyv3/butterfly-idle-01.png',
    loop: true,
  },
  'flight-01-02': {
    id: 'flight-01-02',
    src: '/animations/butterflyv3/butterfly-flight-01-02.png',
    loop: false,
  },
  'idle-02': {
    id: 'idle-02',
    src: '/animations/butterflyv3/butterfly-idle-02.png',
    loop: true,
  },
};

/** Artboard size from Procreate export (hero positioning reference). */
export const BUTTERFLY_ARTBOARD = { width: 2452, height: 1432 } as const;

/** Fine-tune cover placement (artboard px): +x right, −y up. */
export const BUTTERFLY_LAYOUT_NUDGE = { x: 6, y: -5 } as const;

/** Extra hit padding around opaque butterfly pixels (artboard px). */
const HIT_PAD = 28;

type ApngPlayer = Awaited<ReturnType<APNG['getPlayer']>>;

type ParsedClip = {
  clip: ButterflyClip;
  apng: APNG;
};

export type ButterflyDrawnController = {
  spot: ButterflySpotId;
  destroy: () => void;
  resize: () => void;
};

function assertApng(result: APNG | Error): asserts result is APNG {
  if (result instanceof Error) throw result;
}

async function loadClip(clip: ButterflyClip): Promise<ParsedClip> {
  const response = await fetch(clip.src);
  if (!response.ok) throw new Error(`Failed to load ${clip.src}`);
  const buffer = await response.arrayBuffer();
  const parsed = parseAPNG(buffer);
  assertApng(parsed);
  // Force one-shot playback for non-looping clips (Procreate exports plays=0).
  if (!clip.loop) parsed.numPlays = 1;
  await parsed.createImages();
  return { clip, apng: parsed };
}

/** Cover-fit the APNG artboard inside the hero so baked-in landing spots stay aligned. */
export function layoutButterflyCanvas(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  artW: number = BUTTERFLY_ARTBOARD.width,
  artH: number = BUTTERFLY_ARTBOARD.height,
): void {
  const rect = host.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const scale = Math.max(rect.width / artW, rect.height / artH);
  const width = artW * scale;
  const height = artH * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.left = `${(rect.width - width) / 2 + BUTTERFLY_LAYOUT_NUDGE.x * scale}px`;
  canvas.style.top = `${(rect.height - height) / 2 + BUTTERFLY_LAYOUT_NUDGE.y * scale}px`;
}

/** Opaque pixel bounds of the current canvas frame (artboard space). */
export function measureButterflyBounds(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): { minX: number; minY: number; maxX: number; maxY: number } | null {
  const w = canvas.width;
  const h = canvas.height;
  if (w <= 0 || h <= 0) return null;
  const { data } = ctx.getImageData(0, 0, w, h);
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  let found = false;
  // Step by 2 for speed; hit pad covers the missing edge pixels.
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 20) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (!found) return null;
  return {
    minX: Math.max(0, minX - HIT_PAD),
    minY: Math.max(0, minY - HIT_PAD),
    maxX: Math.min(w, maxX + HIT_PAD),
    maxY: Math.min(h, maxY + HIT_PAD),
  };
}

function placeHitTarget(
  hit: HTMLButtonElement,
  canvas: HTMLCanvasElement,
  bounds: { minX: number; minY: number; maxX: number; maxY: number } | null,
): void {
  if (!bounds) {
    hit.style.pointerEvents = 'none';
    hit.hidden = true;
    return;
  }
  const scaleX = canvas.offsetWidth / canvas.width;
  const scaleY = canvas.offsetHeight / canvas.height;
  hit.hidden = false;
  hit.style.left = `${canvas.offsetLeft + bounds.minX * scaleX}px`;
  hit.style.top = `${canvas.offsetTop + bounds.minY * scaleY}px`;
  hit.style.width = `${(bounds.maxX - bounds.minX) * scaleX}px`;
  hit.style.height = `${(bounds.maxY - bounds.minY) * scaleY}px`;
}

export async function createButterflyDrawnController(options: {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  hit: HTMLButtonElement;
  reduceMotion: boolean;
  onReady?: () => void;
}): Promise<ButterflyDrawnController> {
  const { canvas, host, hit, reduceMotion, onReady } = options;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2D canvas unavailable');

  let destroyed = false;
  let player: ApngPlayer | null = null;
  let flying = false;
  let idleReady = false;
  let interactionReady = false;
  let spot: ButterflySpotId = 1;

  const clips: Partial<Record<ButterflyClipId, ParsedClip>> = {};

  const controller: ButterflyDrawnController = {
    get spot() {
      return spot;
    },
    destroy: () => undefined,
    resize: () => undefined,
  };

  const setHitInteractive = (on: boolean) => {
    if (on && idleReady && interactionReady && !flying && spot === 1 && !reduceMotion) {
      hit.disabled = false;
      hit.setAttribute('aria-hidden', 'false');
      hit.tabIndex = 0;
      hit.style.pointerEvents = 'auto';
      hit.hidden = false;
    } else {
      hit.disabled = true;
      hit.setAttribute('aria-hidden', 'true');
      hit.tabIndex = -1;
      hit.style.pointerEvents = 'none';
      if (flying || spot !== 1) hit.hidden = true;
    }
  };

  const syncHitFromCanvas = () => {
    if (destroyed || flying || !idleReady || spot !== 1) {
      setHitInteractive(false);
      return;
    }
    const bounds = measureButterflyBounds(canvas, ctx);
    placeHitTarget(hit, canvas, bounds);
    setHitInteractive(Boolean(bounds));
  };

  const clearPlayer = () => {
    if (!player) return;
    try {
      player.pause();
      player.removeAllListeners();
    } catch {
      /* ignore */
    }
    player = null;
  };

  const playClip = async (parsed: ParsedClip, autoPlay: boolean) => {
    clearPlayer();
    // getPlayer → stop() clears and draws frame 0 of the next clip (no blank gap).
    player = await parsed.apng.getPlayer(ctx, autoPlay);
    return player;
  };

  const startIdleAtSpot = async (nextSpot: ButterflySpotId, idleId: ButterflyClipId) => {
    if (destroyed) return;
    const idle = clips[idleId];
    if (!idle) return;
    spot = nextSpot;
    flying = false;
    idleReady = true;
    const idlePlayer = await playClip(idle, !reduceMotion);
    if (reduceMotion) {
      syncHitFromCanvas();
      return;
    }
    idlePlayer.on('frame', () => {
      if (spot === 1) syncHitFromCanvas();
    });
    syncHitFromCanvas();
  };

  const flyToSpot2 = async () => {
    if (destroyed || flying || reduceMotion || spot !== 1 || !interactionReady) return;
    const flight = clips['flight-01-02'];
    const idle02 = clips['idle-02'];
    if (!flight || !idle02) return;

    flying = true;
    idleReady = false;
    setHitInteractive(false);
    placeHitTarget(hit, canvas, null);

    const flightPlayer = await playClip(flight, true);
    flightPlayer.once('end', () => {
      void startIdleAtSpot(2, 'idle-02');
    });
  };

  // Critical path: keep entrance → idle-01 timing identical.
  const [entrance, idle01] = await Promise.all([
    loadClip(BUTTERFLY_CLIPS.entrance),
    loadClip(BUTTERFLY_CLIPS['idle-01']),
  ]);
  if (destroyed) return controller;
  clips.entrance = entrance;
  clips['idle-01'] = idle01;

  canvas.width = entrance.apng.width;
  canvas.height = entrance.apng.height;
  layoutButterflyCanvas(canvas, host, entrance.apng.width, entrance.apng.height);

  if (reduceMotion) {
    await startIdleAtSpot(1, 'idle-01');
    onReady?.();
  } else {
    const entrancePlayer = await playClip(entrance, true);
    onReady?.();
    entrancePlayer.once('end', () => {
      void startIdleAtSpot(1, 'idle-01');
    });
  }

  // Background-load interactive clips so the first hover never waits on the network.
  void Promise.all([
    loadClip(BUTTERFLY_CLIPS['flight-01-02']),
    loadClip(BUTTERFLY_CLIPS['idle-02']),
  ])
    .then(([flight, idle02]) => {
      if (destroyed) return;
      clips['flight-01-02'] = flight;
      clips['idle-02'] = idle02;
      interactionReady = true;
      syncHitFromCanvas();
    })
    .catch((error) => {
      console.warn('[butterfly-drawn] interactive clips failed to load', error);
    });

  const onHit = (event: Event) => {
    event.preventDefault();
    void flyToSpot2();
  };
  hit.addEventListener('pointerenter', onHit);
  hit.addEventListener('pointerdown', onHit);
  hit.addEventListener('focus', onHit);

  const resize = () => {
    layoutButterflyCanvas(
      canvas,
      host,
      canvas.width || BUTTERFLY_ARTBOARD.width,
      canvas.height || BUTTERFLY_ARTBOARD.height,
    );
    syncHitFromCanvas();
  };

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(host);
  }
  window.addEventListener('resize', resize, { passive: true });

  controller.resize = resize;
  controller.destroy = () => {
    destroyed = true;
    hit.removeEventListener('pointerenter', onHit);
    hit.removeEventListener('pointerdown', onHit);
    hit.removeEventListener('focus', onHit);
    clearPlayer();
    setHitInteractive(false);
    resizeObserver?.disconnect();
    resizeObserver = null;
    window.removeEventListener('resize', resize);
  };

  return controller;
}
