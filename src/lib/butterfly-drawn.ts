import parseAPNG from 'apng-js';
import type { APNG } from 'apng-js';

/** Resting spots in the eventual hover-flight cycle (1 → 2 → 3 → 4 → 5 → 1). */
export type ButterflySpotId = 1 | 2 | 3 | 4 | 5;

export type ButterflyClipId = 'entrance' | 'idle-01';

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
};

/** Artboard size from Procreate export (hero positioning reference). */
export const BUTTERFLY_ARTBOARD = { width: 2452, height: 1432 } as const;

/** Fine-tune cover placement (artboard px): +x right, −y up. */
export const BUTTERFLY_LAYOUT_NUDGE = { x: 22, y: -18 } as const;

type ApngPlayer = Awaited<ReturnType<APNG['getPlayer']>>;

type ParsedClip = {
  clip: ButterflyClip;
  apng: APNG;
};

export type ButterflyDrawnController = {
  /** Current resting spot (always 1 until flights are added). */
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

export async function createButterflyDrawnController(options: {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  reduceMotion: boolean;
  onReady?: () => void;
}): Promise<ButterflyDrawnController> {
  const { canvas, host, reduceMotion, onReady } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');

  let destroyed = false;
  let player: ApngPlayer | null = null;
  const controller: ButterflyDrawnController = {
    spot: 1,
    destroy: () => undefined,
    resize: () => undefined,
  };

  const [entrance, idle] = await Promise.all([
    loadClip(BUTTERFLY_CLIPS.entrance),
    loadClip(BUTTERFLY_CLIPS['idle-01']),
  ]);
  if (destroyed) return controller;

  canvas.width = entrance.apng.width;
  canvas.height = entrance.apng.height;
  layoutButterflyCanvas(canvas, host, entrance.apng.width, entrance.apng.height);

  const clearPlayer = () => {
    if (!player) return;
    try {
      player.stop();
      player.removeAllListeners();
    } catch {
      /* ignore */
    }
    player = null;
  };

  const playClip = async (parsed: ParsedClip, autoPlay: boolean) => {
    clearPlayer();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player = await parsed.apng.getPlayer(ctx, autoPlay);
    return player;
  };

  const startIdleLoop = async () => {
    if (destroyed) return;
    await playClip(idle, true);
  };

  if (reduceMotion) {
    // getPlayer(false) calls stop(), which draws the first idle frame.
    await playClip(idle, false);
    onReady?.();
  } else {
    const entrancePlayer = await playClip(entrance, true);
    onReady?.();
    entrancePlayer.once('end', () => {
      void startIdleLoop();
    });
  }

  const resize = () => {
    layoutButterflyCanvas(
      canvas,
      host,
      canvas.width || BUTTERFLY_ARTBOARD.width,
      canvas.height || BUTTERFLY_ARTBOARD.height,
    );
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
    clearPlayer();
    resizeObserver?.disconnect();
    resizeObserver = null;
    window.removeEventListener('resize', resize);
  };

  return controller;
}
