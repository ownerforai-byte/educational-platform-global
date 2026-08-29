"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const REFERENCE_TYPES = ["INCLUDE", "LINK", "EMBED", "CITE"] as const;

export function ResourceLinkForm({
  resourceId,
  onSuccess,
}: {
  resourceId: string;
  onSuccess?: () => void;
}) {
  const [referencedId, setReferencedId] = useState("");
  const [referenceType, setReferenceType] = useState<(typeof REFERENCE_TYPES)[number]>("LINK");
  const [attribution, setAttribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/resources/${resourceId}/link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource_id: resourceId,
          referenced_id: referencedId,
          reference_type: referenceType,
          attribution: attribution || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to link resource");
      }

      onSuccess?.();
      setReferencedId("");
      setAttribution("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referencedId">Target Resource ID</Label>
            <Input
              id="referencedId"
              value={referencedId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReferencedId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceType">Reference Type</Label>
            <Select
              value={referenceType}
              onValueChange={(v: string) => setReferenceType(v as typeof referenceType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REFERENCE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attribution">Attribution</Label>
            <Input
              id="attribution"
              value={attribution}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAttribution(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Linking..." : "Link Resource"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
