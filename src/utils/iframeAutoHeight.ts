// src/utils/iframeAutoHeight.ts

type HeightMsg = { type: 'rv:height'; height: number };

function getDocHeight(): number {
  const de = document.documentElement;
  const b = document.body;
  return Math.max(
    b.scrollHeight,
    de.scrollHeight,
    b.offsetHeight,
    de.offsetHeight,
    b.clientHeight,
    de.clientHeight
  );
}

/**
 * Sends the child document height to the parent via postMessage.
 * @param parentOrigin Security: set to your WordPress origin if you know it, otherwise '*' and filter on parent.
 */
export function initIframeAutoHeight(options?: { parentOrigin?: string; throttleMs?: number }) {
  const parentOrigin = options?.parentOrigin ?? '*';
  const throttleMs = options?.throttleMs ?? 50;

  let raf = 0;
  let lastSent = 0;

  const sendHeight = () => {
    const now = Date.now();
    if (now - lastSent < throttleMs) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sendHeight);
      return;
    }
    lastSent = now;
    const h = getDocHeight();
    const msg: HeightMsg = { type: 'rv:height', height: h };
    // parent filters origin on its side
    parent.postMessage(msg, parentOrigin);
  };

  const onLoad = () => sendHeight();
  const onResize = () => sendHeight();
  const onTransitionEnd = () => sendHeight();
  const onFontsLoaded = () => sendHeight();

  // Initial + common events
  window.addEventListener('load', onLoad);
  window.addEventListener('resize', onResize);
  window.visualViewport?.addEventListener('resize', onResize); // iOS address bar changes
  document.addEventListener('transitionend', onTransitionEnd);

  // DOM changes
  const mo = new MutationObserver(sendHeight);
  mo.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });

  // Fonts can change layout after load
  if ((document as any).fonts && 'ready' in (document as any).fonts) {
    (document as any).fonts.ready.then(onFontsLoaded).catch(() => {});
  }

  // Kick once
  sendHeight();

  // return cleanup
  return () => {
    window.removeEventListener('load', onLoad);
    window.removeEventListener('resize', onResize);
    window.visualViewport?.removeEventListener('resize', onResize);
    document.removeEventListener('transitionend', onTransitionEnd);
    mo.disconnect();
    if (raf) cancelAnimationFrame(raf);
  };
}
