import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Chat } from "../class/interfaces";
import ChatPage from "./ChatPage";

type EventName = "initChatView" | "messageView";
type EventPayload = Chat[] | Chat;
type EventHandler = (payload: EventPayload) => void;

const ioMock = vi.hoisted(() => vi.fn());

vi.mock("socket.io-client", () => ({
  io: ioMock,
}));

class FakeSocket {
  private readonly handlers = new Map<EventName, EventHandler>();

  readonly on = vi.fn((event: EventName, handler: EventHandler) => {
    this.handlers.set(event, handler);
    return this;
  });

  readonly off = vi.fn((event: EventName, handler: EventHandler) => {
    if (this.handlers.get(event) === handler) {
      this.handlers.delete(event);
    }
    return this;
  });

  readonly connect = vi.fn(() => this);
  readonly disconnect = vi.fn(() => this);
  readonly emit = vi.fn();

  trigger(event: "initChatView", payload: Chat[]): void;
  trigger(event: "messageView", payload: Chat): void;
  trigger(event: EventName, payload: EventPayload): void {
    this.handlers.get(event)?.(payload);
  }
}

const historyMessage: Chat = {
  _id: "history-message",
  msg: "From history",
  sender: {
    username: "Guest",
    avatar: "https://example.com/guest.png",
  },
};

const liveMessage: Chat = {
  _id: "live-message",
  msg: "Live message",
  sender: {
    username: "Guest",
    avatar: "https://example.com/guest.png",
  },
};

describe("ChatPage", () => {
  let socket: FakeSocket;

  beforeEach(() => {
    socket = new FakeSocket();
    ioMock.mockReturnValue(socket);
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  it("connects after login, handles chat events, sends, and disconnects on logout", async () => {
    const user = userEvent.setup();

    render(<ChatPage />);
    expect(ioMock).not.toHaveBeenCalled();

    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "Duc"
    );
    await user.click(screen.getByRole("button", { name: "Join Chat" }));

    await waitFor(() => {
      expect(ioMock).toHaveBeenCalledWith("http://localhost:3002/", {
        autoConnect: false,
      });
    });
    expect(socket.on).toHaveBeenCalledTimes(2);
    expect(socket.connect).toHaveBeenCalledOnce();
    expect(screen.getByRole("heading", { name: "Chat App" })).toBeInTheDocument();
    expect(screen.getByRole("log", { name: "Conversation" })).toBeInTheDocument();
    expect(screen.getByText("Duc")).toBeInTheDocument();

    act(() => {
      socket.trigger("initChatView", [historyMessage]);
    });
    expect(screen.getByText("From history")).toBeInTheDocument();

    act(() => {
      socket.trigger("messageView", liveMessage);
    });
    expect(screen.getByText("Live message")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Message" }), " Hello ");
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(socket.emit).toHaveBeenCalledWith("newMessage", {
      msg: "Hello",
      sender: {
        username: "Duc",
        avatar: "https://picsum.photos/id/1/200/300",
      },
    });

    await user.click(screen.getByRole("button", { name: "Log Out" }));
    await waitFor(() => {
      expect(socket.disconnect).toHaveBeenCalledOnce();
    });
    expect(socket.off).toHaveBeenCalledTimes(2);
    expect(
      screen.getByRole("button", { name: "Join Chat" })
    ).toBeInTheDocument();
  });

  it("disconnects the active socket when the component unmounts", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<ChatPage />);

    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "Duc"
    );
    await user.click(screen.getByRole("button", { name: "Join Chat" }));
    await waitFor(() => expect(socket.connect).toHaveBeenCalledOnce());

    unmount();

    expect(socket.off).toHaveBeenCalledTimes(2);
    expect(socket.disconnect).toHaveBeenCalledOnce();
  });
});
