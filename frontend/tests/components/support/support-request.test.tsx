import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SupportRequest } from "@/components/support/support-request";
import { apiFetch } from "@/lib/api-client";
vi.mock("@/lib/api-client", () => ({ apiFetch: vi.fn() }));
beforeEach(() => { vi.mocked(apiFetch).mockReset(); });
afterEach(cleanup);
it("reports AI content without navigating away", async () => {
  vi.mocked(apiFetch).mockResolvedValue({ message: "Delivered for review" });
  render(<SupportRequest kind="ai_report" />);
  fireEvent.click(screen.getByText("Report AI content"));
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Unsafe answer here" } });
  fireEvent.click(screen.getByRole("button", { name: "Send request" }));
  await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Delivered for review"));
  expect(apiFetch).toHaveBeenCalledWith("/api/user/support-requests", { method: "POST", body: JSON.stringify({ kind: "ai_report", message: "Unsafe answer here" }) });
});
it("shows a failure instead of acknowledging an undelivered request", async () => {
  vi.mocked(apiFetch).mockRejectedValue(new Error("503"));
  render(<SupportRequest kind="account_deletion" />);
  fireEvent.click(screen.getByText("Request account deletion"));
  expect(screen.getByRole("checkbox").hasAttribute("required")).toBe(true);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Please delete my data" } });
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Send request" }));
  await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("not confirmed"));
  expect(screen.queryByRole("status")).toBeNull();
});
