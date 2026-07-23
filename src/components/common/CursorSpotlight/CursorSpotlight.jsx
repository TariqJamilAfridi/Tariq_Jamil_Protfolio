import { useEffect, useRef } from "react";

/**
 * CursorSpotlight — a fixed radial glow that tracks the mouse position.
 * Rendered once at the App level. Uses rAF for silky-smooth updates.
 * On touch devices the element is hidden (opacity 0).
 */
function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function loop() {
      if (el) {
        el.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    // Hide on touch devices that never fire mousemove
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) el.style.opacity = "0";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}

export default CursorSpotlight;
