import React, { useEffect, useRef } from "react";
import img from "../images/background.svg"

function Background() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;

    if (
      !background ||
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) return undefined;

    let frameId = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const updateGlowPosition = () => {
      frameId = null;
      background.style.setProperty("--pointer-x", `${pointerX}px`);
      background.style.setProperty("--pointer-y", `${pointerY}px`);
      background.classList.add("background-pointer-ready");
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(updateGlowPosition);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="background" ref={backgroundRef}>
      <img src={img} alt="" />
      <span className="background-pointer-glow background-pointer-glow-cyan" aria-hidden="true" />
      <span className="background-pointer-glow background-pointer-glow-purple" aria-hidden="true" />
    </div>
  );
}

export default Background;
