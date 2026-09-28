import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ErrorBoundary, withErrorBoundary } from "@/components/perf/error-boundary";

/** React logs caught render errors; keep the test output clean. */
function silenceReactErrors() {
  vi.spyOn(console, "error").mockImplementation(() => {});
}

afterEach(() => {
  vi.restoreAllMocks();
});

function Boom({ explode }: { explode: boolean }) {
  if (explode) throw new Error("render exploded");
  return <p>healthy child</p>;
}

describe("ErrorBoundary", () => {
  it("renders children when nothing throws", () => {
    render(
      <ErrorBoundary name="test">
        <p>fine</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("fine")).toBeTruthy();
  });

  it("catches a render error and shows the shared fallback card", () => {
    silenceReactErrors();

    render(
      <ErrorBoundary name="test">
        <Boom explode />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong!")).toBeTruthy();
    expect(screen.getByText("render exploded")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
  });

  it("recovers the subtree when Try again is pressed", () => {
    silenceReactErrors();

    let shouldThrow = true;
    function Child() {
      if (shouldThrow) throw new Error("first render fails");
      return <p>recovered child</p>;
    }

    render(
      <ErrorBoundary name="test">
        <Child />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong!")).toBeTruthy();

    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("recovered child")).toBeTruthy();
  });

  it("supports a custom node fallback", () => {
    silenceReactErrors();

    render(
      <ErrorBoundary name="test" fallback={<p>custom fallback</p>}>
        <Boom explode />
      </ErrorBoundary>,
    );

    expect(screen.getByText("custom fallback")).toBeTruthy();
  });

  it("supports a render-prop fallback with a working reset", () => {
    silenceReactErrors();

    function Host() {
      let shouldThrow = true;
      function Child() {
        if (shouldThrow) throw new Error("first render fails");
        return <p>second render ok</p>;
      }
      return (
        <ErrorBoundary
          name="test"
          fallback={({ reset }) => (
            <button
              type="button"
              onClick={() => {
                shouldThrow = false;
                reset();
              }}
            >
              recover
            </button>
          )}
        >
          <Child />
        </ErrorBoundary>
      );
    }

    render(<Host />);
    fireEvent.click(screen.getByRole("button", { name: "recover" }));
    expect(screen.getByText("second render ok")).toBeTruthy();
  });

  it("stays silent when asked to and still reports through onError", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();

    const { container } = render(
      <ErrorBoundary name="test" silent onError={onError}>
        <Boom explode />
      </ErrorBoundary>,
    );

    expect(container.textContent).toBe("");
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(errorSpy).toHaveBeenCalled();
  });

  it("clears a captured error when resetKey changes", () => {
    silenceReactErrors();

    const { rerender } = render(
      <ErrorBoundary name="test" resetKey="/a">
        <Boom explode />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong!")).toBeTruthy();

    rerender(
      <ErrorBoundary name="test" resetKey="/b">
        <Boom explode={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("healthy child")).toBeTruthy();
  });
});

describe("withErrorBoundary", () => {
  it("wraps a component without changing its props", () => {
    silenceReactErrors();

    const Wrapped = withErrorBoundary(Boom, { name: "hoc" });
    expect(Wrapped.displayName).toBe("withErrorBoundary(Boom)");

    render(<Wrapped explode={false} />);
    expect(screen.getByText("healthy child")).toBeTruthy();
  });
});
