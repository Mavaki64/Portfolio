import "@testing-library/jest-dom";
import React from "react";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = jest.fn((target: Element) => {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this,
    );
  });

  disconnect = jest.fn();
  unobserve = jest.fn();
  takeRecords = jest.fn();
}

global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

class MockResizeObserver implements ResizeObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

global.ResizeObserver =
  MockResizeObserver as unknown as typeof ResizeObserver;

if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px"),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

jest.mock("motion/react", () => {
  const createMotionComponent = (tag: string) =>
    React.forwardRef(function MotionComponent(
      {
        children,
        initial,
        animate,
        exit,
        variants,
        transition,
        whileInView,
        viewport,
        layoutId,
        style,
        ...domProps
      }: React.PropsWithChildren<Record<string, unknown>>,
      ref: React.Ref<HTMLElement>,
    ) {
      return React.createElement(tag, { ...domProps, ref }, children);
    });

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) => createMotionComponent(tag),
      },
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => true,
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: jest.fn(),
    }),
    animate: jest.fn(() => ({ stop: jest.fn() })),
  };
});
