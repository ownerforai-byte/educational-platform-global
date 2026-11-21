"use client";

import Link from "next/link";
import { ACCOUNT_LINKS, PEOPLE_LINKS, STUDY_LINKS } from "@/features/profile/info-catalog";
import { InfoLinkGrid, useInfoMedia } from "@/features/profile/info-workspace";
import { PlanIncludes } from "@/features/profile/plan-includes";
import { StorageMeter } from "@/features/profile/storage-meter";
import { PROFILE_INFO_FIELDS, profileInfoText } from "@/features/profile/profile-info";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerAccount } from "@/lib/owner";

export function InfoOverviewBoard() {
  const { user } = useSession();
  return <PlanIncludes editable={isOwnerAccount(user)} />;
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
  return (
    <div className="space-y-6">
      {storage ? (
        <StorageMeter storage={storage} />
      ) : (
        <p className="text-sm text-muted-foreground">Storage quota is not available for this account yet.</p>
      )}
      <InfoLinkGrid
        title="Account"
        lede="Profile, settings, wallet and the tools that belong to this sign-in."
        links={ACCOUNT_LINKS}
      />
    </div>
  );
}
