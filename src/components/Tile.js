import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

const FLIP_DURATION_MS = 800;
const FLIP_EASING = "cubic-bezier(.16, 1, .3, 1)";
const CSS_TRANSITION_CHECK_MS = 120;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function parseTransitionTime(value) {
  const time = value.trim();

  if (time.endsWith("ms")) return Number.parseFloat(time);
  if (time.endsWith("s")) return Number.parseFloat(time) * 1000;

  return 0;
}

function getTransformTransitionDuration(element) {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
    return 0;
  }

  const styles = window.getComputedStyle(element);
  const properties = styles.transitionProperty
    .split(",")
    .map((property) => property.trim());

  if (
    properties.length > 0 &&
    !properties.includes("all") &&
    !properties.includes("transform")
  ) {
    return 0;
  }

  return styles.transitionDuration
    .split(",")
    .reduce((longest, duration) => Math.max(longest, parseTransitionTime(duration)), 0);
}

function getRotationAngle(element) {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
    return 0;
  }

  const transform = window.getComputedStyle(element).transform;

  if (!transform || transform === "none") return 0;

  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    const values = matrix3d[1].split(",").map(Number);
    return (Math.atan2(values[8], values[0]) * 180) / Math.PI;
  }

  return 0;
}

function rotationDistance(firstAngle, secondAngle) {
  const difference = Math.abs(firstAngle - secondAngle) % 360;
  return Math.min(difference, 360 - difference);
}

export default function Tile(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationMode, setAnimationMode] = useState(() =>
    prefersReducedMotion() ? "static" : null,
  );
  const isFlippedRef = useRef(false);
  const innerRef = useRef(null);
  const animationRef = useRef(null);
  const cssCheckTimeoutRef = useRef(null);
  const pendingStartAngleRef = useRef(null);
  const titleText = String(props.title ?? "");
  const valueText = String(props.value ?? "");
  const valueLengthClass =
    valueText.length > 35
      ? "tile-value-long"
      : valueText.length > 24
        ? "tile-value-medium"
        : "";

  const cancelFallbackAnimation = useCallback(() => {
    const animation = animationRef.current;
    animationRef.current = null;

    if (animation) animation.cancel();
  }, []);

  const clearCssTransitionCheck = useCallback(() => {
    if (cssCheckTimeoutRef.current === null) return;

    window.clearTimeout(cssCheckTimeoutRef.current);
    cssCheckTimeoutRef.current = null;
  }, []);

  const switchToStaticLayout = useCallback(() => {
    clearCssTransitionCheck();
    cancelFallbackAnimation();
    pendingStartAngleRef.current = null;
    isFlippedRef.current = false;
    setAnimationMode("static");
    setIsFlipped(false);
  }, [cancelFallbackAnimation, clearCssTransitionCheck]);

  const scheduleAnimationProgressCheck = useCallback((inner, startAngle, targetAngle) => {
    clearCssTransitionCheck();

    if (typeof window === "undefined") return;

    const startedAt =
      typeof window.performance?.now === "function"
        ? window.performance.now()
        : Date.now();

    cssCheckTimeoutRef.current = window.setTimeout(() => {
      cssCheckTimeoutRef.current = null;

      const now =
        typeof window.performance?.now === "function"
          ? window.performance.now()
          : Date.now();
      const elapsed = now - startedAt;

      // A throttled timer cannot tell us whether the transition really ran.
      if (elapsed > CSS_TRANSITION_CHECK_MS * 3) return;

      const currentAngle = getRotationAngle(inner);
      const hasProgress = rotationDistance(currentAngle, startAngle) > 0.5;
      const reachedTarget = rotationDistance(currentAngle, targetAngle) < 0.5;

      if (!hasProgress || reachedTarget) switchToStaticLayout();
    }, CSS_TRANSITION_CHECK_MS);
  }, [clearCssTransitionCheck, switchToStaticLayout]);

  const handleClick = () => {
    if (animationMode === "static") {
      return;
    }

    if (prefersReducedMotion()) {
      switchToStaticLayout();
      return;
    }

    clearCssTransitionCheck();
    const inner = innerRef.current;
    const startAngle = inner ? getRotationAngle(inner) : 0;

    if (inner) {
      pendingStartAngleRef.current = startAngle;
      cancelFallbackAnimation();
    }

    const nextFlipped = !isFlippedRef.current;
    isFlippedRef.current = nextFlipped;

    if (animationMode === "css" && inner) {
      scheduleAnimationProgressCheck(inner, startAngle, nextFlipped ? 180 : 0);
    }

    setIsFlipped(nextFlipped);
  };

  useLayoutEffect(() => {
    return () => {
      clearCssTransitionCheck();
      cancelFallbackAnimation();
    };
  }, [cancelFallbackAnimation, clearCssTransitionCheck]);

  useLayoutEffect(() => {
    const inner = innerRef.current;

    if (!inner || prefersReducedMotion()) {
      setAnimationMode("static");
      return;
    }

    if (getTransformTransitionDuration(inner) > 0) {
      setAnimationMode("css");
      return;
    }

    if (typeof inner.animate === "function") {
      setAnimationMode("waapi");
      return;
    }

    setAnimationMode("static");
  }, []);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const startAngle = pendingStartAngleRef.current;
    const targetAngle = isFlipped ? 180 : 0;

    pendingStartAngleRef.current = null;

    if (!inner || animationMode !== "waapi" || prefersReducedMotion()) return;

    const fromAngle = Number.isFinite(startAngle)
      ? startAngle
      : getRotationAngle(inner);

    if (Math.abs(targetAngle - fromAngle) < 0.1) return;

    const animation = inner.animate(
      [
        { transform: `rotateY(${fromAngle}deg)` },
        { transform: `rotateY(${targetAngle}deg)` },
      ],
      {
        duration: FLIP_DURATION_MS,
        easing: FLIP_EASING,
        fill: "forwards",
      },
    );

    animationRef.current = animation;
    scheduleAnimationProgressCheck(inner, fromAngle, targetAngle);
    animation.onfinish = () => {
      if (animationRef.current === animation) animationRef.current = null;
    };
  }, [animationMode, isFlipped, scheduleAnimationProgressCheck]);

  return (
    <button
      type="button"
      className={`tile tile-${props.shape || "default"} ${valueLengthClass}${
        isFlipped ? " is-flipped" : ""
      }${animationMode === "static" ? " tile-static-layout" : ""}`}
      onClick={handleClick}
      aria-pressed={isFlipped}
      aria-label={`${titleText}: ${valueText}`}
    >
      <span className="tile-surface">
        <span className="tile-inner" ref={innerRef}>
          <span className="tile-face tile-front" aria-hidden="true">
            {titleText}
          </span>
          <span className="tile-face tile-back" aria-hidden="true">
            {valueText}
          </span>
        </span>
      </span>
    </button>
  );
}
