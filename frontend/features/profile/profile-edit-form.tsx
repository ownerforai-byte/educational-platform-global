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
import { ProfileAvatar, ProfileCover } from "@/features/profile/profile-media";
import {
  checkUsername,
  getMyProfile,
  profilePath,
  updateMyProfile,
  uploadAvatar,
  uploadCover,
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
  const [uploading, setUploading] = useState<"avatar" | "cover" | null>(null);
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
  const baseline = useRef<string>("");
  const uploadAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => uploadAbort.current?.abort();
  }, []);

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
        baseline.current = JSON.stringify(next);
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "Could not load profile");
      }
    })();
  }, []);

  const dirty = useMemo(() => JSON.stringify(form) !== baseline.current, [form]);

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
    if (name.length < 3 || name === (profile?.username ?? "")) {
      setUsernameStatus(null);
      return;
    }
    const t = window.setTimeout(() => {
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
      baseline.current = JSON.stringify(saved);
      setMessage("Profile saved.");
      if (next.username) router.push(profilePath(next.username, next.id));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    if (!baseline.current) return;
    setForm(JSON.parse(baseline.current) as typeof form);
    setMessage(null);
  };

  const runUpload = async (kind: "avatar" | "cover", file: File) => {
    uploadAbort.current?.abort();
    const ac = new AbortController();
    uploadAbort.current = ac;
    setUploading(kind);
    setMessage(null);
    try {
      const result = kind === "avatar" ? await uploadAvatar(file, ac.signal) : await uploadCover(file, ac.signal);
      if (ac.signal.aborted) return;
      setProfile(result.profile);
      if (result.storage) setStorage(result.storage);
      setMessage(kind === "avatar" ? "Avatar uploaded." : "Cover uploaded.");
    } catch (e) {
      if (ac.signal.aborted || (e instanceof DOMException && e.name === "AbortError")) return;
      if (e instanceof Error && e.name === "AbortError") return;
      setMessage(e instanceof Error ? e.message : `${kind === "avatar" ? "Avatar" : "Cover"} upload failed`);
    } finally {
      if (uploadAbort.current === ac) {
        uploadAbort.current = null;
        setUploading(null);
      }
    }
  };

  const onAvatar = async (file: File | null) => {
    if (!file) return;
    await runUpload("avatar", file);
  };

  const onCover = async (file: File | null) => {
    if (!file) return;
    await runUpload("cover", file);
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 p-4 pb-16">
      <MotionHero profile={profile} />
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
          <Field label={`Avatar (max 256² WebP)${uploading === "avatar" ? " — uploading…" : ""}`} id="avatar">
            <Input type="file" accept="image/*" onChange={(e) => void onAvatar(e.target.files?.[0] ?? null)} />
          </Field>
          <Field label={`Cover (max 1200×400 WebP)${uploading === "cover" ? " — uploading…" : ""}`} id="cover">
            <Input type="file" accept="image/*" onChange={(e) => void onCover(e.target.files?.[0] ?? null)} />
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

function MotionHero({ profile }: { profile: PublicProfile | null }) {
  if (!profile) return null;
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <ProfileCover url={profile.coverUrl} className="h-24" />
      <div className="flex items-center gap-3 px-4 py-3">
        <ProfileAvatar
          url={profile.avatarUrl}
          name={profile.fullName}
          className="h-14 w-14 rounded-full border"
          textClassName="text-sm"
        />
        <p className="font-medium">{profile.fullName}</p>
      </div>
    </div>
  );
}
