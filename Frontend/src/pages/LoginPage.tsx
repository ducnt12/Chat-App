import { FaReact } from "react-icons/fa6";
import User from "../class/user";
import { StateAction } from "../class/StateAction";
import { useState } from "react";

const LoginPage: React.FC<StateAction<User>> = ({ set }) => {
  const [user, setUser] = useState<User>({ username: "", avatar: "" });
  const handleLogin = (): void => {
    // Get random avatar from Lorem Picsum
    setUser({
      ...user,
      avatar: `https://picsum.photos/id/${
        Math.floor(Math.random() * (1000 - 1 + 1)) + 1
      }/200/300`,
    });
    // // Set value to localStorage
    // localStorage.setItem("user", JSON.stringify(user));
    set(user);
  };
  return (
    <div className="login_container">
      <div className="login_title">
        <FaReact className="login_icon" />
        <h1>Chat App</h1>
      </div>
      <form onSubmit={() => handleLogin()} className="login_form">
        <input
          name="username"
          type="text"
          placeholder="Place your username here"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
