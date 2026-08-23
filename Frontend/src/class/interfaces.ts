export interface User {
  username: string;
  avatar: string;
}

export interface NewMessage {
  msg: string;
  sender: User;
}

export interface Chat extends NewMessage {
  _id: string;
}

export interface ServerToClientEvents {
  initChatView: (chats: Chat[]) => void;
  messageView: (chat: Chat) => void;
}

export interface ClientToServerEvents {
  newMessage: (chat: NewMessage) => void;
}
