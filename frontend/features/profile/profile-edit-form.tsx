"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StorageMeter } from "@/features/profile/storage-meter";
import {
  ProfileImageEditButton,
  type ProfileImageChangeResult,
} from "@/features/profile/profile-image-editor";
import { ProfileAvatar, ProfileCover } from "@/features/profile/profile-media";
import {
  checkUsername,
  getMyProfile,
  profilePath,
  updateMyProfile,
  type ProfileExtras,
  type PublicProfile,
  type StorageInfo,
} from "@/lib/api/profile";

type Visibility = "public" | "members" | "private";

const emptyExtras: ProfileExtras = {
  occupation: "",
  education: "",
  skills: "",
  interests: "",
  portfolio: "",
  intro: "",
};

function extrasFrom(profile: PublicProfile | null): ProfileExtras {
  const raw = profile?.extras ?? {};
  return {
    occupation: typeof raw.occupation === "string" ? raw.occupation : "",
    education: typeof raw.education === "string" ? raw.education : "",
    skills: typeof raw.skills === "string" ? raw.skills : "",
    interests: typeof raw.interests === "string" ? raw.interests : "",
    portfolio: typeof raw.portfolio === "string" ? raw.portfolio : "",
    intro: typeof raw.intro === "string" ? raw.intro : "",
  };
}

export function ProfileEditForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    visibility: "public" as Visibility,
    extras: emptyExtras,
  });
  const [baseline, setBaseline] = useState<string>("");

  useEffect(() => {
    void (async () => {
      try {
        const me = await getMyProfile();
        setProfile(me.profile);
        setStorage(me.storage);
        const next = {
          fullName: me.profile.fullName,
          username: me.profile.username ?? "",
          bio: me.profile.bio ?? "",
          location: me.profile.location ?? "",
          website: me.profile.website ?? "",
          visibility: (me.profile.visibility as Visibility) || "public",
          extras: extrasFrom(me.profile),
        };
        setForm(next);
        setBaseline(JSON.stringify(next));
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "Could not load profile");
      }
    })();
  }, []);

  const dirty = useMemo(() => Boolean(baseline) && JSON.stringify(form) !== baseline, [form, baseline]);

  useEffect(() => {
    if (!dirty) return;
    const onLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  useEffect(() => {
    const name = form.username.trim().toLowerCase();
    const t = window.setTimeout(() => {
      if (name.length < 3 || name === (profile?.username ?? "")) {
        setUsernameStatus(null);
        return;
      }
      void checkUsername(name)
        .then((r) => setUsernameStatus(r.available ? "Available" : "Taken"))
        .catch(() => setUsernameStatus(null));
    }, 400);
    return () => window.clearTimeout(t);
  }, [form.username, profile?.username]);

  const onSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { profile: next } = await updateMyProfile({
        fullName: form.fullName,
        username: form.username,
        bio: form.bio,
        location: form.location,
        website: form.website,
        visibility: form.visibility,
        extras: form.extras,
      });
      setProfile(next);
      const saved = { ...form, extras: extrasFrom(next) };
      setForm(saved);
      setBaseline(JSON.stringify(saved));
      setMessage("Profile saved.");
      if (next.username) router.push(profilePath(next.username, next.id));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    if (!baseline) return;
    setForm(JSON.parse(baseline) as typeof form);
    setMessage(null);
  };

  /** The editor uploads or removes one image and hands back the fresh profile. */
  const onMediaChanged = (kind: "avatar" | "cover", result: ProfileImageChangeResult) => {
    setProfile(result.profile);
    if (result.storage) setStorage(result.storage);
    setMessage(
      `${kind === "avatar" ? "Profile picture" : "Cover image"} ${
        kind === "avatar" ? (result.profile.avatarUrl ? "updated" : "removed") : result.profile.coverUrl ? "updated" : "removed"
      }.`,
    );
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 p-4 pb-16">
      <IdentityHero profile={profile} onChanged={onMediaChanged} />
      {storage ? <StorageMeter storage={storage} /> : null}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Public profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Display name" id="fullName">
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            />
          </Field>
          <Field label="Username" id="username" hint={usernameStatus}>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value.toLowerCase() }))}
            />
          </Field>
          <Field label="Bio" id="bio">
            <Textarea id="bio" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
          </Field>
          <Field label="Location" id="location">
            <Input id="location" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
          </Field>
          <Field label="Website" id="website">
            <Input id="website" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
          </Field>
          <Field label="Visibility" id="visibility">
            <select
              id="visibility"
              className="h-9 rounded-md border bg-background px-3 text-sm"
              value={form.visibility}
              onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value as Visibility }))}
            >
              <option value="public">Public</option>
              <option value="members">Members only</option>
              <option value="private">Private</option>
            </select>
          </Field>
          <Field label="Avatar (max 256² WebP, all common formats)" id="avatar">
            <p className="text-xs text-muted-foreground">
              Use the pencil on the profile picture above — replace or remove it there.
            </p>
          </Field>
          <Field label="Cover (max 1200×400 WebP, all common formats)" id="cover">
            <p className="text-xs text-muted-foreground">
              Use the pencil on the cover image above — it is independent of the profile picture.
            </p>
          </Field>
          <details className="rounded-lg border p-3">
            <summary className="cursor-pointer text-sm font-medium">More about you (optional)</summary>
            <div className="mt-3 space-y-3">
              <Field label="Occupation" id="occupation">
                <Input
                  id="occupation"
                  value={form.extras.occupation}
                  onChange={(e) => setForm((f) => ({ ...f, extras: { ...f.extras, occupation: e.target.value } }))}
                />
              </Field>
              <Field label="Education" id="education">
                <Input
                  id="education"
                  value={form.extras.education}
                  onChange={(e) => setForm((f) => ({ ...f, extras: { ...f.extras, education: e.target.value } }))}
                />
              </Field>
              <Field label="Skills" id="skills">
                <Input
                  id="skills"
                  value={form.extras.skills}
                  onChange={(e) => setForm((f) => ({ ...f, extras: { ...f.extras, skills: e.target.value } }))}
                />
              </Field>
              <Field label="Interests" id="interests">
                <Input
                  id="interests"
                  value={form.extras.interests}
                  onChange={(e) => setForm((f) => ({ ...f, extras: { ...f.extras, interests: e.target.value } }))}
                />
              </Field>
              <Field label="Portfolio" id="portfolio">
                <Input
                  id="portfolio"
                  value={form.extras.portfolio}
                  onChange={(e) => setForm((f) => ({ ...f, extras: { ...f.extras, portfolio: e.target.value } }))}
                />
              </Field>
            </div>
          </details>
          <div className="flex flex-wrap gap-2">
            <Button className="min-h-11" onClick={() => void onSave()} disabled={saving || !dirty} aria-label={saving ? "Saving profile" : "Save profile"}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
            <Button type="button" variant="outline" className="min-h-11" onClick={onCancel} disabled={!dirty || saving}>
              Cancel
            </Button>
            <Button variant="outline" asChild>
              <Link href="/profile">Back to Info hub</Link>
            </Button>
          </div>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string | null;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function IdentityHero({
  profile,
  onChanged,
}: {
  profile: PublicProfile | null;
  onChanged: (kind: "avatar" | "cover", result: ProfileImageChangeResult) => void;
}) {
  if (!profile) return null;
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="relative">
        <ProfileCover url={profile.coverUrl} className="h-24" />
        <ProfileImageEditButton
          kind="cover"
          currentUrl={profile.coverUrl}
          displayName={profile.fullName}
          hasImage={Boolean(profile.coverUrl)}
          onChanged={(result) => onChanged("cover", result)}
          className="right-2 top-2"
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="relative">
          <ProfileAvatar
            url={profile.avatarUrl}
            name={profile.fullName}
            className="h-14 w-14 rounded-full border"
            textClassName="text-sm"
          />
          <ProfileImageEditButton
            kind="avatar"
            currentUrl={profile.avatarUrl}
            displayName={profile.fullName}
            hasImage={Boolean(profile.avatarUrl)}
            onChanged={(result) => onChanged("avatar", result)}
            className="-bottom-1 -right-1 h-7 w-7"
          />
        </div>
        <p className="font-medium">{profile.fullName}</p>
      </div>
    </div>
  );
}
