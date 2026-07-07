const MOBILE_HERO_QUERY = '(max-width: 639px)';

const HERO_REVEAL_TIMELINE: Array<{ selector: string; delay: number }> = [
  { selector: '.hero-fade--line1', delay: 80 },
  { selector: '.hero-fade--line2', delay: 1200 },
  { selector: '.hero-fade--rest', delay: 2200 },
];

export function initHeroMobileMotion(reduceMotion: boolean): void {
  if (reduceMotion || !window.matchMedia(MOBILE_HERO_QUERY).matches) return;

  const hero = document.querySelector('.chapter-1-hero');
  if (!hero) return;

  HERO_REVEAL_TIMELINE.forEach(({ selector, delay }) => {
    const el = hero.querySelector<HTMLElement>(selector);
    if (!el) return;

    window.setTimeout(() => {
      el.classList.add('is-visible');
    }, delay);
  });

  const sageParallax = document.getElementById('sage-parallax');
  if (!sageParallax) return;

  const maxShiftPx = 28;
  const maxScrollPx = () => Math.min(520, window.innerHeight * 0.7);

  const updateParallax = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const progress = Math.min(Math.max(scrollY / maxScrollPx(), 0), 1);
    sageParallax.style.transform = `translate3d(${-maxShiftPx * progress}px, 0, 0)`;
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
  };

  updateParallax();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
}
