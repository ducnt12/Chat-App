import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import InputText from "./InputText";

describe("InputText", () => {
  it("sends a trimmed message and clears the textarea", async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();

    render(<InputText onSend={onSend} />);
    const textarea = screen.getByRole("textbox", { name: "Message" });
    await user.type(textarea, "  Hello  ");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(onSend).toHaveBeenCalledOnce();
    expect(onSend).toHaveBeenCalledWith("Hello");
    expect(textarea).toHaveValue("");
  });

  it("does not send or clear a whitespace-only message", async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();

    render(<InputText onSend={onSend} />);
    const textarea = screen.getByRole("textbox", { name: "Message" });
    await user.type(textarea, "   ");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(onSend).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("   ");
  });
});
