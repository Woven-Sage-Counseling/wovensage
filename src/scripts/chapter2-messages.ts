export function initChapter2Messages(reduceMotion: boolean): void {
  const chapter2MessagesEl = document.getElementById('chapter-2-messages');
  if (!chapter2MessagesEl) return;

  const messageEls = Array.from(chapter2MessagesEl.querySelectorAll<HTMLElement>('.chapter-2__message'));
  if (messageEls.length === 0) return;

  const fadeMs = 1500;
  const holdMs = 8000;
  let currentIndex = 0;

  const setActiveMessage = (nextIndex: number) => {
    messageEls.forEach((messageEl, index) => {
      const isActive = index === nextIndex;
      messageEl.classList.toggle('is-active', isActive);
      messageEl.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    currentIndex = nextIndex;
  };

  const advanceMessage = () => {
    const nextIndex = (currentIndex + 1) % messageEls.length;
    const previousIndex = currentIndex;

    messageEls[previousIndex].classList.remove('is-active');
    messageEls[previousIndex].setAttribute('aria-hidden', 'true');

    window.setTimeout(() => {
      messageEls[nextIndex].classList.add('is-active');
      messageEls[nextIndex].setAttribute('aria-hidden', 'false');
      currentIndex = nextIndex;

      window.setTimeout(advanceMessage, holdMs);
    }, fadeMs);
  };

  if (reduceMotion || messageEls.length < 2) {
    setActiveMessage(0);
    return;
  }

  messageEls.forEach((messageEl) => messageEl.classList.remove('is-active'));

  window.requestAnimationFrame(() => {
    messageEls[0].classList.add('is-active');
    messageEls[0].setAttribute('aria-hidden', 'false');
  });

  window.setTimeout(() => {
    advanceMessage();
  }, fadeMs + holdMs);
}
