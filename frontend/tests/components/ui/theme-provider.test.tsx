import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { isTheme, ThemeProvider, useTheme } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function Controls() {
  const { theme, setTheme, liteMode } = useTheme();
  return (
    <div>
      <output data-testid="theme">{theme}</output>
      <output data-testid="lite">{String(liteMode)}</output>
      <button onClick={() => setTheme("light")}>Choose light</button>
      <button onClick={() => setTheme("nebula")}>Choose nebula</button>
    </div>
  );
}

function renderTheme(defaultTheme: "nebula" | "system" = "nebula") {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <Controls />
      <ThemeToggle />
    </ThemeProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-lite");
  document.documentElement.style.colorScheme = "";
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  Object.defineProperty(navigator, "connection", { configurable: true, value: undefined });
  document.head.querySelectorAll('[id^="ravi-fonts"], #ravi-google-fonts').forEach((node) => node.remove());
});

describe("appearance preferences", () => {
  it("validates stored theme values instead of accepting unknown class names", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("system")).toBe(true);
    expect(isTheme("not-a-theme")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });

  it("applies light mode immediately and persists without a route reload", () => {
    renderTheme();
    fireEvent.click(screen.getByRole("button", { name: "Choose light" }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(localStorage.getItem("neb-theme")).toBe("light");
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("restores saved theme and Lite mode without removing the theme choices", async () => {
    localStorage.setItem("neb-theme", "sepia");
    localStorage.setItem("neb-lite-mode", "true");
    renderTheme();

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("sepia"));
    expect(document.documentElement.dataset.lite).toBe("true");
    expect(screen.getByTestId("lite")).toHaveTextContent("true");

    fireEvent.click(screen.getByRole("button", { name: "Choose nebula" }));
    expect(document.documentElement.dataset.theme).toBe("nebula");
    expect(document.documentElement.dataset.lite).toBe("true");
  });

  it("toggles Lite mode from the appearance menu and avoids external font requests", async () => {
    renderTheme();
    fireEvent.click(screen.getByRole("button", { name: "Choose appearance and data-saving settings" }));
    const liteSwitch = screen.getByRole("switch", { name: "Lite mode" });
    expect(liteSwitch).toHaveAttribute("aria-checked", "false");
    fireEvent.click(liteSwitch);

    expect(screen.getByTestId("lite")).toHaveTextContent("true");
    expect(localStorage.getItem("neb-lite-mode")).toBe("true");
    expect(document.documentElement.dataset.lite).toBe("true");
    expect(document.getElementById("ravi-google-fonts")).toBeNull();
  });

  it("defaults to Lite mode on save-data / slow mobile connections", async () => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: false, effectiveType: "2g" },
    });
    renderTheme();

    await waitFor(() => expect(document.documentElement.dataset.lite).toBe("true"));
    expect(screen.getByTestId("lite")).toHaveTextContent("true");
  });
});
