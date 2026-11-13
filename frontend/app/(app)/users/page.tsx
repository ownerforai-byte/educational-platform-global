"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profilePath, searchUsers } from "@/lib/api/profile";

export default function UsersSearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Array<{ id: string; fullName: string; username: string | null }>>([]);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (q.trim().length < 2) return;
    setLoading(true);
    try {
      const { users } = await searchUsers(q.trim());
      setResults(users);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-4 p-4 pb-16">
      <h1 className="text-xl font-semibold">Find students</h1>
      <div className="flex gap-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or username" />
        <Button onClick={() => void run()} disabled={loading}>
          Search
        </Button>
      </div>
      <ul className="space-y-2">
        {results.map((u) => (
          <li key={u.id}>
            <Link href={profilePath(u.username, u.id)} className="text-primary underline">
              {u.fullName}
              {u.username ? ` @${u.username}` : ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
