import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { SchematicDiagram } from '@/components/lab/schematic-diagram';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Schematic } from '@/components/content/schematic-frame';

vi.mock('@/components/content/math-markdown', () => ({ MathMarkdown: ({ content }: { content: string }) => <span>{content}</span> }));
afterEach(cleanup);
const props = { subjectSlug: 'physics', topicSlug: 'projectile-motion', topicTitle: 'Projectile motion', unitId: 'motion-in-a-plane', classSlug: 'class-11' };

describe('schematic interaction', () => {
  it('zooms about the sheet centre and resets', () => {
    render(<SchematicDiagram {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByRole('button', { name: '125%' })).toBeInTheDocument();
    const layer = document.querySelector('[data-diagram-layer]');
    expect(layer?.getAttribute('transform')).toBe('translate(-112.5 -65) scale(1.25)');
    fireEvent.click(screen.getByRole('button', { name: 'Reset view' }));
    expect(layer?.getAttribute('transform')).toBe('translate(0 0) scale(1)');
  });
  it('leaves ordinary wheel scrolling to the page', () => {
    render(<SchematicDiagram {...props} />);
    const drawing = screen.getByRole('img');
    const scroll = new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true });
    drawing.dispatchEvent(scroll);
    expect(scroll.defaultPrevented).toBe(false);
    expect(screen.getByRole('button', { name: '100%' })).toBeInTheDocument();
    fireEvent.wheel(drawing, { deltaY: -100, ctrlKey: true });
    expect(screen.getByRole('button', { name: '114%' })).toBeInTheDocument();
  });
  it('activates a keyboard hotspot exactly once', () => {
    render(<SchematicDiagram {...props} />);
    const hotspot = document.querySelector<SVGGElement>('.schem-chip')!;
    fireEvent.keyDown(hotspot, { key: 'Enter' });
    expect(hotspot).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('group', { name: /Knowledge:/ })).toBeInTheDocument();
  });
  it('clears selected facts when navigating to another topic', () => {
    const { rerender } = render(<SchematicDiagram {...props} />);
    fireEvent.click(document.querySelector('.schem-chip')!);
    rerender(<SchematicDiagram {...props} topicSlug="escape-velocity" topicTitle="Escape velocity" unitId="gravitation" />);
    expect(screen.queryByRole('group', { name: /Knowledge:/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '100%' })).toBeInTheDocument();
  });
  it('exposes readable index controls and deliberate pan mode', () => {
    render(<SchematicDiagram {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Parts index' }));
    expect(screen.getByText(/Parts index — click/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pan off' }));
    expect(screen.getByRole('button', { name: 'Pan on' })).toHaveAttribute('aria-pressed', 'true');
  });
  it('exports a complete standalone SVG rather than the zoomed crop', () => {
    const create = vi.fn((_blob: Blob) => 'blob:schematic-test');
    const revoke = vi.fn();
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = create;
    URL.revokeObjectURL = revoke;
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    try {
      render(<SchematicDiagram {...props} />);
      fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
      fireEvent.click(screen.getByRole('button', { name: 'Save SVG' }));
      expect(click).toHaveBeenCalledOnce();
      expect(create).toHaveBeenCalledOnce();
      const blob = create.mock.calls[0][0] as Blob;
      expect(blob.type).toBe('image/svg+xml');
      expect(blob.size).toBeGreaterThan(1000);
      const anchor = click.mock.instances[0] as HTMLAnchorElement;
      expect(anchor.download).toBe('projectile-motion.svg');
      expect(document.querySelector('[data-diagram-layer]')).toHaveAttribute('transform', 'translate(-112.5 -65) scale(1.25)');
    } finally {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
      click.mockRestore();
    }
  });
  it('keeps projectile targets within the canvas', () => {
    render(<SchematicDiagram {...props} />);
    document.querySelectorAll('[data-diagram-layer] > g:first-child circle, circle.schem-target').forEach((circle) => {
      const x = Number(circle.getAttribute('cx'));
      const y = Number(circle.getAttribute('cy'));
      expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(900);
      expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(520);
    });
  });
});

describe('coordinate plot controls', () => {
  it('zooms without clipping the plot and resets to fit', () => {
    render(<Schematic w={300} h={200} ox={150} oy={100} scale={25}><circle cx={150} cy={100} r={5} /></Schematic>);
    const plot = screen.getByRole('img', { name: /Coordinate plot/ });
    expect(plot).toHaveStyle({ width: '100%' });
    fireEvent.click(screen.getByRole('button', { name: 'Zoom plot in' }));
    expect(plot).toHaveStyle({ width: '125%' });
    fireEvent.click(screen.getByRole('button', { name: 'Reset plot zoom' }));
    expect(plot).toHaveStyle({ width: '100%' });
    expect(screen.getByRole('button', { name: 'Zoom plot out' })).toBeDisabled();
  });
});

describe('shared tab navigation', () => {
  it('supports arrows, Home/End, linked panels and retained state', () => {
    render(<Tabs defaultValue="a"><TabsList><TabsTrigger value="a">First</TabsTrigger><TabsTrigger value="b">Second</TabsTrigger></TabsList><TabsContent value="a"><input aria-label="Saved input" /></TabsContent><TabsContent value="b">Other panel</TabsContent></Tabs>);
    fireEvent.change(screen.getByLabelText('Saved input'), { target: { value: 'retained' } });
    const first = screen.getByRole('tab', { name: 'First' });
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    const second = screen.getByRole('tab', { name: 'Second' });
    expect(second).toHaveFocus(); expect(second).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel');
    expect(panel.id).toBe(second.getAttribute('aria-controls'));
    expect(within(panel).getByText('Other panel')).toBeInTheDocument();
    fireEvent.keyDown(second, { key: 'Home' });
    expect(screen.getByLabelText('Saved input')).toHaveValue('retained');
    fireEvent.keyDown(first, { key: 'End' });
    expect(second).toHaveAttribute('aria-selected', 'true');
  });
});
