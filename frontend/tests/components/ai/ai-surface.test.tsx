import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Brain, History } from "lucide-react";
import {
  AiSurfaceHeader,
} from "@/components/ai/ai-surface-header";
import {
  AiEmptyState,
  AiErrorState,
  AiLoadingState,
} from "@/components/ai/ai-surface-states";

/**
 * Shared AI surface language (plan.md §13 — M4): one header pattern
 * (gradient hero strip, badge, pool-meter slot, feature cards) and one
 * loading / error / empty trio, used by every Veer page.
 */

describe("AiSurfaceHeader", () => {
  it("renders the hero identity, badge, crumb and feature cards", () => {
    render(
      <AiSurfaceHeader
        icon={Brain}
        title="Veer Quiz Generator"
        subtitle="Generate, answer, get graded."
        accent="border-blue-500/25 bg-blue-500/10 text-blue-500"
        gradientFrom="from-blue-500/[0.07]"
        badge="Practice"
        crumb="Quiz Generator"
        features={[{ icon: History, title: "Five formats", text: "MCQ to essays." }]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Veer Quiz Generator" })).toBeInTheDocument();
    expect(screen.getByText("Practice")).toBeInTheDocument();
    expect(screen.getByText("Quiz Generator")).toBeInTheDocument();
    expect(screen.getByText("Five formats")).toBeInTheDocument();
    expect(screen.getByText("Generate, answer, get graded.")).toBeInTheDocument();
  });

  it("keeps the AI Studio back-link and the pool meter slot", () => {
    render(
      <AiSurfaceHeader
        icon={History}
        title="History Console"
        subtitle="Search your saved chats."
        accent="border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-500"
        gradientFrom="from-fuchsia-500/[0.07]"
        meter={<div>POOL METER</div>}
      />,
    );
    expect(screen.getByRole("link", { name: /AI Studio/ })).toHaveAttribute("href", "/ai");
    expect(screen.getByText("POOL METER")).toBeInTheDocument();
  });
});

describe("AI surface states", () => {
  it("renders the shared loading state", () => {
    render(<AiLoadingState />);
    expect(screen.getByRole("status")).toHaveTextContent("Asking Veer…");
  });

  it("renders the shared error state with a working retry", () => {
    const onRetry = vi.fn();
    render(<AiErrorState message="Veer is unavailable." onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Veer is unavailable.");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders the shared empty state with an optional action", () => {
    const onClick = vi.fn();
    render(
      <AiEmptyState
        title="No sets yet"
        description="Generate your first quiz to see it here."
        action={{ label: "Generate", onClick }}
      />,
    );
    expect(screen.getByText("No sets yet")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
