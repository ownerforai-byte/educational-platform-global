import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { LegalBlurGate } from "@/app/legal/legal-blur-gate";
afterEach(cleanup);
it("makes disclosure text readable and available to assistive technology", () => {
  const { container } = render(<LegalBlurGate><h2>Service providers</h2><p>Supabase and Sentry</p></LegalBlurGate>);
  expect(screen.getByRole("heading", { name: "Service providers" })).toBeVisible();
  expect(container.querySelector('[aria-hidden="true"], [inert], [class*="blur-"]')).toBeNull();
  expect(screen.queryByText("Talk with owner for this")).toBeNull();
});
