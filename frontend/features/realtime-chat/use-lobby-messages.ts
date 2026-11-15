"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { getClientFirestore } from "@/lib/firebase/firestore-client";
import { subscribeFirebaseUser } from "@/lib/firebase/client-auth";
import { REALTIME_LOBBY_ID, type LobbyMessage } from "./types";

const MESSAGE_LIMIT = 80;

function mapDoc(id: string, data: Record<string, unknown>): LobbyMessage {
  const created = data.createdAt as Timestamp | undefined;
  return {
    id,
    senderId: String(data.senderId ?? ""),
    text: String(data.text ?? ""),
    createdAt: created?.toDate?.() ?? null,
  };
}

export function useLobbyMessages() {
  const [firebaseUid, setFirebaseUid] = useState<string | undefined>();
  const [messages, setMessages] = useState<LobbyMessage[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => subscribeFirebaseUser((user) => setFirebaseUid(user?.uid)), []);

  useEffect(() => {
    const db = getClientFirestore();
  const senderId = firebaseUid;
    if (!db || !senderId) {
      setMessages([]);
      setReady(Boolean(db));
      return;
    }
    const q = query(
      collection(db, "realtime_chats", REALTIME_LOBBY_ID, "messages"),
      orderBy("createdAt", "desc"),
      limit(MESSAGE_LIMIT),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const next = snap.docs.map((d) => mapDoc(d.id, d.data() as Record<string, unknown>));
        setMessages(next.reverse());
        setReady(true);
        setError(null);
      },
      (err) => {
        setError(err.message || "Could not load messages");
        setReady(true);
      },
    );
    return () => unsub();
  }, [firebaseUid]);

  const send = useCallback(
    async (text: string) => {
      const db = getClientFirestore();
      const senderId = firebaseUid;
      if (!db || !senderId) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      await addDoc(collection(db, "realtime_chats", REALTIME_LOBBY_ID, "messages"), {
        senderId,
        text: trimmed.slice(0, 2000),
        createdAt: serverTimestamp(),
      });
    },
    [firebaseUid],
  );

  return { messages, send, ready, error, firebaseUid };
}