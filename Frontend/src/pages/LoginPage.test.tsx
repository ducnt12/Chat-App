import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("submits a trimmed username with a deterministic avatar", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.49);
    const onLogin = vi.fn();
    const user = userEvent.setup();

    render(<LoginPage onLogin={onLogin} />);
    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "  Duc  "
    );
    await user.click(screen.getByRole("button", { name: "Join Chat" }));

    expect(onLogin).toHaveBeenCalledOnce();
    expect(onLogin).toHaveBeenCalledWith({
      username: "Duc",
      avatar: "https://picsum.photos/id/50/200/300",
    });
  });

  it("rejects a whitespace-only username", async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();

    render(<LoginPage onLogin={onLogin} />);
    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "   "
    );
    await user.click(screen.getByRole("button", { name: "Join Chat" }));

    expect(onLogin).not.toHaveBeenCalled();
  });
});
