export type LobbyMessage = {
  id: string;
  senderId: string;
  text: string;
  createdAt: Date | null;
};

export const REALTIME_LOBBY_ID = "lobby";