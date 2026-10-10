import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SidebarNavigation } from '@/components/layout/sidebar-navigation';
vi.mock('next/navigation', () => ({ usePathname: () => '/home' }));
vi.mock('next/link', () => ({ default: ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...rest}>{children}</a> }));
vi.mock('@/features/auth/hooks/use-session', () => ({ useSession: () => ({ user: null, logoutUser: vi.fn(), refresh: vi.fn() }) }));
afterEach(cleanup);

describe('mobile navigation', () => {
  it('traps focus, closes with Escape, and restores focus/body scrolling', () => {
    const originalOverflow = document.body.style.overflow;
    render(<MobileNav />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });
    fireEvent.click(trigger);
    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    const links = within(drawer).getAllByRole('link');
    expect(document.body.style.overflow).toBe('hidden');
    const last = links[links.length - 1];
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(links[0]).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe(originalOverflow);
  });
  it('announces empty results and hides signed-in destinations for guests', () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.queryByRole('link', { name: /Profile/ })).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox', { name: 'Filter navigation' }), { target: { value: 'no-match-xyz' } });
    expect(screen.getByRole('status')).toHaveTextContent('No destinations match');
    fireEvent.click(screen.getByRole('button', { name: 'Clear navigation filter' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

describe('sidebar navigation', () => {
  it('keeps a section label available after collapsing it', () => {
    render(<SidebarNavigation />);
    const toggle = screen.getAllByRole('button', { name: /^Collapse / })[0];
    const name = toggle.getAttribute('aria-label')!.replace('Collapse ', '');
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: `Expand ${name}` })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: `Expand ${name}` })).toHaveTextContent(name);
  });
});
