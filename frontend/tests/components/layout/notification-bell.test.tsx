import { beforeEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NotificationBell } from "@/components/layout/notification-bell";
import {
  NOTIFICATIONS_FEED_KEY,
  NOTIFICATIONS_STORAGE_KEY,
  markAllNotificationsRead,
  markNotificationRead,
  pushNotification,
  refreshNotificationsFromStorage,
} from "@/lib/notifications";
import NotificationsPage from "@/app/(app)/notifications/page";

/**
 * The badge must derive from the LIVE inbox (real events only) and RESET TO
 * ZERO once everything is marked read — on the notifications page, on the
 * header bell, and across tabs. A fresh device has no seeded alerts at all.
 */

function seedLive(count: number): void {
  for (let i = 0; i < count; i += 1) {
    act(() => {
      pushNotification({
        id: `live-quiz-${i}`,
        category: "curriculum",
        title: `Quiz ${i} scored`,
        body: `You answered ${i + 1} questions correctly.`,
        href: "/ai-quiz/history",
        actionLabel: "Review answers",
      });
    });
  }
}

beforeEach(() => {
  localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
  localStorage.removeItem(NOTIFICATIONS_FEED_KEY);
  // The module store survives between tests — re-read the cleared storage.
  refreshNotificationsFromStorage();
});

describe("live notification badges", () => {
  it("starts at zero on a fresh device — no seeded/coded alerts", async () => {
    render(<NotificationBell />);
    await waitFor(() => expect(screen.getByLabelText("Notifications")).toBeInTheDocument());
    expect(screen.queryByTestId("notification-bell-badge")).toBeNull();
  });

  it("shows the exact live count when a real event arrives", async () => {
    render(<NotificationBell />);
    await waitFor(() => expect(screen.queryByTestId("notification-bell-badge")).toBeNull());

    seedLive(3);

    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toHaveTextContent("3"),
    );
  });

  it("zeroes the bell badge when everything is marked read", async () => {
    seedLive(3);
    render(<NotificationBell />);
    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toBeInTheDocument(),
    );

    act(() => {
      markAllNotificationsRead();
    });

    await waitFor(() =>
      expect(screen.queryByTestId("notification-bell-badge")).toBeNull(),
    );
  });

  it("hides the bell badge when the live store is already fully read", async () => {
    seedLive(2);
    act(() => markAllNotificationsRead());
    render(<NotificationBell />);
    await waitFor(() => expect(screen.getByLabelText("Notifications")).toBeInTheDocument());
    expect(screen.queryByTestId("notification-bell-badge")).toBeNull();
  });

  it("keeps 'All Alerts' in sync with the live unread count, reaching 0", async () => {
    seedLive(2);
    render(
      <>
        <NotificationBell />
        <NotificationsPage />
      </>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toHaveTextContent("2"),
    );
    expect(screen.getByRole("button", { name: /All Alerts \(2\)/ })).toBeInTheDocument();
    expect(screen.getByText("2 New")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /mark all read/i }));

    await waitFor(() =>
      expect(screen.queryByTestId("notification-bell-badge")).toBeNull(),
    );
    expect(screen.getByRole("button", { name: /All Alerts \(0\)/ })).toBeInTheDocument();
    expect(screen.queryByText(/New$/)).toBeNull();
    expect(screen.getByText(/all caught up/i)).toBeInTheDocument();
  });

  it("approving one card decrements both badges by exactly one", async () => {
    seedLive(3);
    render(
      <>
        <NotificationBell />
        <NotificationsPage />
      </>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toHaveTextContent("3"),
    );

    const markButtons = screen.getAllByTitle("Mark as read");
    fireEvent.click(markButtons[0]);

    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toHaveTextContent("2"),
    );
    expect(screen.getByRole("button", { name: /All Alerts \(2\)/ })).toBeInTheDocument();
  });

  it("cross-tab storage events re-sync the bell", async () => {
    seedLive(2);
    render(<NotificationBell />);
    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toBeInTheDocument(),
    );

    // Another tab approves everything and broadcasts it.
    act(() => {
      markAllNotificationsRead();
      window.dispatchEvent(new Event("storage"));
    });

    await waitFor(() =>
      expect(screen.queryByTestId("notification-bell-badge")).toBeNull(),
    );
  });

  it("the read store survives a remount (approved stays approved)", () => {
    seedLive(2);
    const first = render(<NotificationsPage />);
    fireEvent.click(screen.getByRole("button", { name: /mark all read/i }));
    first.unmount();

    render(<NotificationsPage />);
    expect(screen.getByText(/all caught up/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /All Alerts \(0\)/ })).toBeInTheDocument();
    void markNotificationRead; // store API stays importable for cards
  });
});
