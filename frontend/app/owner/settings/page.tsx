"use client";

import { useCallback, useEffect, useState } from "react";
import { Settings, RefreshCw, Plus, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnerSettings, updateOwnerSettings } from "@/lib/api/owner";
import type { OwnerSetting } from "@/lib/api/owner";

export default function OwnerSettingsPage() {
  const [settings, setSettings] = useState<OwnerSetting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await getOwnerSettings();
      setSettings(res.settings ?? []);
      const initial: Record<string, string> = {};
      for (const s of res.settings ?? []) {
        initial[s.key] =
          typeof s.value === "string" ? s.value : JSON.stringify(s.value);
      }
      setDrafts(initial);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveAll = async () => {
    setIsSaving(true);
    setError(null);
    setSavedMsg(null);
    try {
      const changed = settings
        .filter((s) => drafts[s.key] !== undefined && drafts[s.key] !== originalString(s))
        .map((s) => ({ key: s.key, value: parseDraft(drafts[s.key]) }));
      if (changed.length === 0) {
        setSavedMsg("Nothing to save.");
        return;
      }
      await updateOwnerSettings(changed);
      setSavedMsg(`Saved ${changed.length} setting${changed.length === 1 ? "" : "s"}.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const originalString = (s: OwnerSetting) =>
    typeof s.value === "string" ? s.value : JSON.stringify(s.value);

  // Numbers stay numbers, valid JSON parses; everything else is a string.
  const parseDraft = (v: string) => {
    const t = v.trim();
    if (t === "") return "";
    if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
    if (t === "true") return true;
    if (t === "false") return false;
    if (t.startsWith("{") || t.startsWith("[")) {
      try {
        return JSON.parse(t);
      } catch {
        return v;
      }
    }
    return v;
  };

  const addSetting = async () => {
    const key = newKey.trim();
    if (!key) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateOwnerSettings([{ key, value: parseDraft(newValue) }]);
      setNewKey("");
      setNewValue("");
      await load();
      setSavedMsg(`Added "${key}".`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Add failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteSetting = async (key: string) => {
    if (!window.confirm(`Delete setting "${key}"?`)) return;
    setIsSaving(true);
    setError(null);
    try {
      // The API has no DELETE; persist an explicit null to retire the key.
      await updateOwnerSettings([{ key, value: null }]);
      await load();
      setSavedMsg(`Removed "${key}".`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setIsSaving(false);
    }
  };

  const dirtyCount = settings.filter(
    (s) => drafts[s.key] !== undefined && drafts[s.key] !== originalString(s)
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Platform Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Key/value configuration for the whole platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={saveAll} disabled={isSaving || dirtyCount === 0}>
            <Save className="h-4 w-4 mr-1" />
            Save{dirtyCount > 0 ? ` (${dirtyCount})` : ""}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}
      {savedMsg && (
        <div className="rounded-md border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600">
          {savedMsg}
        </div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Existing settings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : settings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No settings yet — add the first one below.
            </p>
          ) : (
            <div className="space-y-2">
              {settings.map((s) => (
                <div key={s.key} className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border p-3">
                  <div className="sm:w-56 shrink-0">
                    <p className="text-sm font-mono font-medium truncate">{s.key}</p>
                    {s.description && (
                      <p className="text-xs text-muted-foreground truncate">{s.description}</p>
                    )}
                  </div>
                  <Input
                    value={drafts[s.key] ?? ""}
                    onChange={(e) => setDrafts((d) => ({ ...d, [s.key]: e.target.value }))}
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteSetting(s.key)}
                    aria-label={`Delete ${s.key}`}
                    className="text-red-600 hover:text-red-700 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Add a setting</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-2">
          <Input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="key (e.g. maintenance_mode)"
            className="sm:w-56 font-mono text-sm"
          />
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder='value (e.g. true, "text", 42, {"json":true})'
            className="flex-1 font-mono text-sm"
          />
          <Button onClick={addSetting} disabled={isSaving || !newKey.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
