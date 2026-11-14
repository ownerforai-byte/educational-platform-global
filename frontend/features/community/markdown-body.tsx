"use client";

import type { ReactNode } from "react";

export function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const bold = match[2] || match[3];
    const italic = match[4] || match[5];
    if (bold) parts.push(<strong key={index}>{bold}</strong>);
    else if (italic) parts.push(<em key={index}>{italic}</em>);
    last = match.index + match[0].length;
    index += 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function MarkdownBody({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const key = `list-${blocks.length}`;
    const items = list.items.map((item, itemIndex) => (
      <li key={`${key}-${itemIndex}`}>
        <InlineText text={item} />
      </li>
    ));
    blocks.push(
      list.ordered
        ? <ol key={key} className="list-decimal space-y-1 pl-5">{items}</ol>
        : <ul key={key} className="list-disc space-y-1 pl-5">{items}</ul>,
    );
    list = null;
  };

  lines.forEach((line, index) => {
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (heading) {
      flush();
      const Tag = heading[1].length === 1 ? "h2" : heading[1].length === 2 ? "h3" : "h4";
      const className = heading[1].length === 1 ? "text-lg font-semibold" : "text-base font-semibold";
      blocks.push(
        <Tag key={`h-${index}`} className={className}>
          <InlineText text={heading[2]} />
        </Tag>,
      );
      return;
    }
    if (bullet) {
      if (list?.ordered) flush();
      list = list ?? { ordered: false, items: [] };
      list.items.push(bullet[1]);
      return;
    }
    if (numbered) {
      if (list && !list.ordered) flush();
      list = list ?? { ordered: true, items: [] };
      list.items.push(numbered[1]);
      return;
    }
    flush();
    if (!line.trim()) {
      blocks.push(<div key={`s-${index}`} className="h-2" />);
      return;
    }
    blocks.push(
      <p key={`p-${index}`}>
        <InlineText text={line} />
      </p>,
    );
  });
  flush();
  return <div className="space-y-2 text-sm leading-relaxed text-foreground">{blocks}</div>;
}
