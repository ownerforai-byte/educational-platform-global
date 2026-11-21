"use client";

import Link from "next/link";
import { ACCOUNT_LINKS, PEOPLE_LINKS, STUDY_LINKS } from "@/features/profile/info-catalog";
import { InfoLinkGrid, useInfoMedia } from "@/features/profile/info-workspace";
import { PROFILE_INFO_FIELDS, profileInfoText } from "@/features/profile/profile-info";
import { useSession } from "@/features/auth/hooks/use-session";

function ColumnPreview({
  href,
  kicker,
  title,
  links,
}: {
  href: string;
  kicker: string;
  title: string;
  links: Array<{ href: string; title: string; detail: string }>;
}) {
  return (
    <section className="flex flex-col rounded-lg border border-border bg-card">
      <header className="flex items-baseline justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{kicker}</p>
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <Link href={href} className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
          Open
        </Link>
      </header>
      <ul className="divide-y divide-border">
        {links.slice(0, 4).map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block px-4 py-3 hover:bg-muted/40">
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="block text-xs text-muted-foreground">{item.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InfoOverviewBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <ColumnPreview href="/profile/study" kicker="01" title="Study" links={STUDY_LINKS} />
      <ColumnPreview href="/profile/people" kicker="02" title="People" links={PEOPLE_LINKS} />
      <ColumnPreview href="/profile/account" kicker="03" title="Account" links={ACCOUNT_LINKS} />
    </div>
  );
}

export function InfoDetailsBoard() {
  const { user } = useSession();
  const { media } = useInfoMedia();
  const rows = [
    { label: "Full name", value: media?.fullName || user?.fullName || "—" },
    { label: "Username", value: media?.username ? `@${media.username}` : "—" },
    { label: "Email", value: user?.email || "—" },
    { label: "Location", value: media?.location || "—" },
    { label: "Website", value: media?.website || "—" },
    { label: "Bio", value: media?.bio || "—" },
    ...PROFILE_INFO_FIELDS.map((field) => ({
      label: field.label,
      value: profileInfoText(media?.extras, field.key) || "—",
    })),
  ];

  return (
    <section>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Personal information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown on your public page when the profile is visible.
          </p>
        </div>
        <Link
          href="/profile/edit"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          Edit details
        </Link>
      </header>
      <dl className="grid overflow-hidden rounded-lg border border-border md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-border px-4 py-3 odd:md:border-r">
            <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {row.label}
            </dt>
            <dd className="mt-1 break-words text-sm">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function InfoStudyBoard() {
  return (
    <InfoLinkGrid
      title="Study"
      lede="Curriculum, notes, schedule and the record of what you have finished."
      links={STUDY_LINKS}
    />
  );
}

export function InfoPeopleBoard() {
  return (
    <InfoLinkGrid
      title="People"
      lede="Community, study spaces and other students."
      links={PEOPLE_LINKS}
      columns={3}
    />
  );
}

export function InfoAccountBoard() {
  const { storage } = useInfoMedia();
  const used = storage ? `${Math.round(storage.usedBytes / (1024 * 1024))} MB used` : "Storage loading";
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {storage?.unlimited ? "Storage is not capped on this plan." : used}
        {storage && !storage.unlimited
          ? ` · ${Math.round(storage.remainingBytes / (1024 * 1024))} MB free`
          : ""}
      </p>
      <InfoLinkGrid
        title="Account"
        lede="Profile, settings, wallet and the tools that belong to this sign-in."
        links={ACCOUNT_LINKS}
      />
    </div>
  );
}
