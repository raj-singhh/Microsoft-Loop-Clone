import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";
import { LiveList, createClient } from "@liveblocks/client";
// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      cursor: { x: number; y: number };
      cursorColor: string;
      editingText: any
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // Example, a conflict-free list
      document: LiveList<any>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        name: string;
        picture: string;
        color:any
        
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
      // Example has two events, using a union
      // | { type: "PLAY" } 
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}


const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

const liveblocksContext = createLiveblocksContext(client);

export const { RoomProvider, useMyPresence, useUpdateMyPresence, useRoom, useOthers } = createRoomContext<any>(liveblocksContext as any);
