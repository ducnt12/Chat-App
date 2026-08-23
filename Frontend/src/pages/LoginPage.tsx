import { FaCommentDots, FaUser } from "react-icons/fa6";
import { useState, type FormEvent } from "react";
import type { User } from "../class/interfaces";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const getRandomPhotoId = (): number => Math.floor(Math.random() * 100) + 1;

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      return;
    }

    onLogin({
      username: trimmedUsername,
      avatar: `https://picsum.photos/id/${getRandomPhotoId()}/200/300`,
    });
  };

  return (
    <section className="login_card" aria-labelledby="login_title">
      <div className="login_brand" translate="no">
        <span className="brand_mark" aria-hidden="true">
          <FaCommentDots />
        </span>
        <span>Chat App</span>
      </div>

      <div className="login_copy">
        <p className="login_eyebrow">Welcome</p>
        <h1 id="login_title">Welcome to Chat App</h1>
        <p>Choose a display name to enter the conversation.</p>
      </div>

      <form onSubmit={handleLogin} className="login_form">
        <label htmlFor="username">Display Name</label>
        <div className="login_input">
          <FaUser aria-hidden="true" />
          <input
            id="username"
            name="username"
            type="text"
            placeholder="e.g. Alex…"
            autoComplete="username"
            spellCheck={false}
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <button type="submit">Join Chat</button>
      </form>
    </section>
  );
};

export default LoginPage;
