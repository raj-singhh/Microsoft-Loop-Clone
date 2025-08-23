"use client";

import { ReactNode } from "react";
import { LiveblocksProvider } from "@liveblocks/react";

export function NotificationsProvider({ children }) {
  return (
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCK_PK}>
      {children}
    </LiveblocksProvider>
  );
}