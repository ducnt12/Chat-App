import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChatList from "./ChatList";
import type { Chat, User } from "../class/interfaces";

const loggedUser: User = {
  username: "Duc",
  avatar: "https://example.com/duc.png",
};

const chats: Chat[] = [
  {
    _id: "sent-message",
    msg: "Sent message",
    sender: loggedUser,
  },
  {
    _id: "received-message",
    msg: "Received message",
    sender: {
      username: "Guest",
      avatar: "https://example.com/guest.png",
    },
  },
];

describe("ChatList", () => {
  it("renders sent and received messages with their existing layout classes", () => {
    render(<ChatList chats={chats} loggedUser={loggedUser} />);

    expect(screen.getByRole("log", { name: "Conversation" })).toBeInTheDocument();
    expect(screen.getByText("Sent message").closest("article")).toHaveClass(
      "chat_sender"
    );
    expect(screen.getByText("Received message").closest("article")).toHaveClass(
      "chat_receiver"
    );
  });
});
