export function initSageParallax(reduceMotion: boolean): void {
  if (reduceMotion) return;

  const isMobile = window.matchMedia('(max-width: 639px)').matches;
  const target = isMobile
    ? document.querySelector<HTMLElement>('.chapter-1-hero__sage-inner')
    : document.getElementById('sage-parallax');

  if (!target) return;

  const maxShiftPx = 28;
  const maxScrollPx = () => Math.min(520, window.innerHeight * 0.7);

  const updateSageParallax = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const progress = Math.min(Math.max(scrollY / maxScrollPx(), 0), 1);
    target.style.transform = `translate3d(${-maxShiftPx * progress}px, 0, 0)`;
  };

  updateSageParallax();
  window.addEventListener('scroll', updateSageParallax, { passive: true });
  window.addEventListener('resize', updateSageParallax, { passive: true });
}
