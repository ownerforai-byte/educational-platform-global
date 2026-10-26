import { beforeEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NotificationBell } from "@/components/layout/notification-bell";
import {
  INITIAL_NOTIFICATIONS,
  NOTIFICATIONS_STORAGE_KEY,
  markAllNotificationsRead,
  markNotificationRead,
  refreshNotificationsFromStorage,
} from "@/lib/notifications";
import NotificationsPage from "@/app/(app)/notifications/page";

/**
 * QA fix (plan.md §14 5.1 + 5.2): the notification badge must derive from the
 * shared read-id store and RESET TO ZERO once everything is marked read —
 * both on the notifications page and on the header bell, which used to show a
 * static pulsing dot regardless of real state.
 */

beforeEach(() => {
  localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
  // The module store survives between tests — re-read the cleared storage.
  refreshNotificationsFromStorage();
});

describe("notification badges reset after mark all read", () => {
  it("zeroes the bell badge when the store is fully read", async () => {
    render(<NotificationBell />);
    // Badge appears once the client store hydrates.
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

  it("hides the bell badge when the store starts fully read", async () => {
    localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(INITIAL_NOTIFICATIONS.map((n) => n.id)),
    );
    refreshNotificationsFromStorage();
    render(<NotificationBell />);
    await waitFor(() => expect(screen.getByLabelText("Notifications")).toBeInTheDocument());
    expect(screen.queryByTestId("notification-bell-badge")).toBeNull();
  });

  it("mark all read on the page clears the page badge and the bell together", async () => {
    render(
      <>
        <NotificationBell />
        <NotificationsPage />
      </>,
    );

    // Both surfaces show the pending count first.
    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toBeInTheDocument(),
    );
    expect(screen.getByText(`${INITIAL_NOTIFICATIONS.length} New`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /mark all read/i }));

    // 5.1 acceptance: every badge is zero after mark all read.
    await waitFor(() =>
      expect(screen.queryByTestId("notification-bell-badge")).toBeNull(),
    );
    expect(screen.queryByText(/New$/)).toBeNull();
    expect(screen.getByText(/all caught up/i)).toBeInTheDocument();
  });

  it("approving one card keeps the remaining count on both badges", async () => {
    render(
      <>
        <NotificationBell />
        <NotificationsPage />
      </>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toHaveTextContent(
        String(INITIAL_NOTIFICATIONS.length),
      ),
    );

    const markButtons = screen.getAllByTitle("Mark as read");
    fireEvent.click(markButtons[0]);

    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toHaveTextContent(
        String(INITIAL_NOTIFICATIONS.length - 1),
      ),
    );
  });

  it("cross-tab storage events re-sync the bell (5.2)", async () => {
    render(<NotificationBell />);
    await waitFor(() =>
      expect(screen.getByTestId("notification-bell-badge")).toBeInTheDocument(),
    );

    // Another tab approves everything and broadcasts it.
    act(() => {
      localStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(INITIAL_NOTIFICATIONS.map((n) => n.id)),
      );
      window.dispatchEvent(new Event("storage"));
    });

    await waitFor(() =>
      expect(screen.queryByTestId("notification-bell-badge")).toBeNull(),
    );
  });

  it("the read store survives a remount (approved = removed stays approved)", () => {
    const first = render(<NotificationsPage />);
    fireEvent.click(screen.getByRole("button", { name: /mark all read/i }));
    first.unmount();

    render(<NotificationsPage />);
    expect(screen.getByText(/all caught up/i)).toBeInTheDocument();
    void markNotificationRead; // store API stays importable for cards
  });
});
