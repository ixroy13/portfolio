import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Tile from "./Tile";

const originalMatchMedia = window.matchMedia;
const originalGetComputedStyle = window.getComputedStyle;
const originalAnimate = Element.prototype.animate;

function setReducedMotionPreference(matches) {
  window.matchMedia = jest.fn(() => ({
    matches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

function setCssTransition(duration = "0.8s") {
  return jest
    .spyOn(window, "getComputedStyle")
    .mockImplementation(() => ({
      transform: "none",
      transitionDuration: duration,
      transitionProperty: "transform",
    }));
}

afterEach(() => {
  jest.useRealTimers();
  window.matchMedia = originalMatchMedia;
  window.getComputedStyle = originalGetComputedStyle;

  if (originalAnimate) {
    Element.prototype.animate = originalAnimate;
  } else {
    delete Element.prototype.animate;
  }
});

test("flips only the tile that was clicked and toggles it back", () => {
  setReducedMotionPreference(false);
  setCssTransition();

  render(
    <>
      <Tile title="Miasto" value="Wrocław" />
      <Tile title="Kraj" value="Polska" />
    </>,
  );

  const tiles = screen.getAllByRole("button");

  expect(tiles).toHaveLength(2);
  expect(tiles[0]).toHaveAttribute("type", "button");
  expect(tiles[0]).toHaveAttribute("aria-pressed", "false");
  expect(tiles[1]).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(tiles[0]);

  expect(tiles[0]).toHaveClass("is-flipped");
  expect(tiles[0]).toHaveAttribute("aria-pressed", "true");
  expect(tiles[1]).not.toHaveClass("is-flipped");
  expect(tiles[1]).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(tiles[0]);

  expect(tiles[0]).not.toHaveClass("is-flipped");
  expect(tiles[0]).toHaveAttribute("aria-pressed", "false");
});

test("uses the static layout without starting an animation for reduced motion", () => {
  setReducedMotionPreference(true);
  const animate = jest.fn();
  Element.prototype.animate = animate;

  render(<Tile title="Miasto" value="Wrocław" />);
  const tile = screen.getByRole("button");

  fireEvent.click(tile);

  expect(tile).toHaveClass("tile-static-layout");
  expect(tile).not.toHaveClass("is-flipped");
  expect(tile).toHaveAttribute("aria-pressed", "false");
  expect(animate).not.toHaveBeenCalled();
});

test("uses the Web Animations fallback only when CSS has no transition", () => {
  setReducedMotionPreference(false);

  const animations = [];
  Element.prototype.animate = jest.fn(() => {
    const animation = {
      cancel: jest.fn(),
      onfinish: null,
    };
    animations.push(animation);
    return animation;
  });

  const computedStyle = jest
    .spyOn(window, "getComputedStyle")
    .mockImplementation((element) => ({
      transform: element.closest(".tile")?.classList.contains("is-flipped")
        ? "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
        : "none",
      transitionDuration: "0s",
      transitionProperty: "transform",
    }));

  render(<Tile title="Miasto" value="Wrocław" />);
  const tile = screen.getByRole("button");

  fireEvent.click(tile);

  expect(Element.prototype.animate).toHaveBeenCalledWith(
    [
      { transform: "rotateY(0deg)" },
      { transform: "rotateY(180deg)" },
    ],
    expect.objectContaining({
      duration: 800,
      fill: "forwards",
    }),
  );

  fireEvent.click(tile);

  expect(animations[0].cancel).toHaveBeenCalled();
  expect(tile).not.toHaveClass("is-flipped");
  expect(tile).toHaveAttribute("aria-pressed", "false");

  computedStyle.mockRestore();
});

test("uses the old static layout when no animation path is available", () => {
  setReducedMotionPreference(false);
  setCssTransition("0s");
  delete Element.prototype.animate;

  render(<Tile title="Miasto" value="Wrocław" />);
  const tile = screen.getByRole("button");

  expect(tile).toHaveClass("tile-static-layout");
  expect(tile).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(tile);

  expect(tile).toHaveClass("tile-static-layout");
  expect(tile).not.toHaveClass("is-flipped");
});

test("falls back to the static layout when CSS jumps directly to the target", () => {
  setReducedMotionPreference(false);
  jest.useFakeTimers();

  jest.spyOn(window, "getComputedStyle").mockImplementation((element) => ({
    transform: element.closest(".tile")?.classList.contains("is-flipped")
      ? "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
      : "none",
    transitionDuration: "0.8s",
    transitionProperty: "transform",
  }));

  render(<Tile title="Miasto" value="Wrocław" />);
  const tile = screen.getByRole("button");

  fireEvent.click(tile);
  expect(tile).toHaveClass("is-flipped");

  act(() => {
    jest.advanceTimersByTime(120);
  });

  expect(tile).toHaveClass("tile-static-layout");
  expect(tile).not.toHaveClass("is-flipped");
  expect(tile).toHaveAttribute("aria-pressed", "false");
});
