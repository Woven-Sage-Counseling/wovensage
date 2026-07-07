export function initScrollReveal(reduceMotion: boolean): void {
  const revealEls = document.querySelectorAll<HTMLElement>('.scroll-reveal');
  if (revealEls.length === 0) return;

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  revealEls.forEach((el) => observer.observe(el));
}
