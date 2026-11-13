"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StorageMeter } from "@/features/profile/storage-meter";
import {
  getMyProfile,
  getStorage,
  profilePath,
  updateMyProfile,
  uploadAvatar,
  uploadCover,
  type PublicProfile,
  type StorageInfo,
} from "@/lib/api/profile";

export function ProfileEditForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    visibility: "public" as "public" | "members" | "private",
  });

  useEffect(() => {
    void (async () => {
      const [me, st] = await Promise.all([getMyProfile(), getStorage()]);
      setProfile(me.profile);
      setStorage(st);
      setForm({
        fullName: me.profile.fullName,
        username: me.profile.username ?? "",
        bio: me.profile.bio ?? "",
        location: me.profile.location ?? "",
        website: me.profile.website ?? "",
        visibility: (me.profile.visibility as typeof form.visibility) || "public",
      });
    })();
  }, []);

  const onSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { profile: next } = await updateMyProfile(form);
      setProfile(next);
      setMessage("Profile saved.");
      if (next.username) router.push(profilePath(next.username, next.id));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onAvatar = async (file: File | null) => {
    if (!file) return;
    const { profile: next } = await uploadAvatar(file);
    setProfile(next);
    const st = await getStorage();
    setStorage(st);
  };

  const onCover = async (file: File | null) => {
    if (!file) return;
    const { profile: next } = await uploadCover(file);
    setProfile(next);
    const st = await getStorage();
    setStorage(st);
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
          <div className="grid gap-2">
            <Label htmlFor="fullName">Display name</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value.toLowerCase() }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
          </div>
          <div className="grid gap-2">
            <Label>Avatar (WebP 512²)</Label>
            <Input type="file" accept="image/*" onChange={(e) => void onAvatar(e.target.files?.[0] ?? null)} />
          </div>
          <div className="grid gap-2">
            <Label>Cover (1600×500 WebP)</Label>
            <Input type="file" accept="image/*" onChange={(e) => void onCover(e.target.files?.[0] ?? null)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => void onSave()} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
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

function MotionHero({ profile }: { profile: PublicProfile | null }) {
  if (!profile) return null;
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div
        className="h-24 bg-muted bg-cover bg-center"
        style={profile.coverUrl ? { backgroundImage: `url(${profile.coverUrl})` } : undefined}
      />
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="h-14 w-14 rounded-full border bg-muted bg-cover"
          style={profile.avatarUrl ? { backgroundImage: `url(${profile.avatarUrl})` } : undefined}
        />
        <p className="font-medium">{profile.fullName}</p>
      </div>
    </div>
  );
}
