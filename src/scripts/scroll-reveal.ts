function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight * 0.92 && rect.bottom > 0;
}

export function initScrollReveal(reduceMotion: boolean): void {
  const revealEls = document.querySelectorAll<HTMLElement>('.scroll-reveal');
  if (revealEls.length === 0) return;

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealEls.forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add('is-visible');
    }
  });

  document.documentElement.classList.add('scroll-reveal-enabled');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -5% 0px',
    },
  );

  revealEls.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}
