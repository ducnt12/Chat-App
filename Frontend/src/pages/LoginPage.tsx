import { FaReact } from "react-icons/fa6";
import { User, StateAction } from "../class/interfaces";
import { FC, useState } from "react";
import { RandomNumCallback } from "../class/types";

const LoginPage: FC<StateAction<User>> = ({ set }) => {
  const [user, setUser] = useState<User>({ username: "", avatar: "" });

  // Get random number
  const getRandomNumber: RandomNumCallback = (
    min: number,
    max: number
  ): number => {
    if (min > max) {
      throw new Error("Min value must be less than or equal to max value.");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Handle form submission
  const handleLogin = (callback: RandomNumCallback): void => {
    set({
      ...user,
      avatar: `https://picsum.photos/id/${callback(1, 100)}/200/300`,
    });
  };

  return (
    <div className="login_container">
      <div className="login_title">
        <FaReact className="login_icon" />
        <h1>Chat App</h1>
      </div>
      <form
        onSubmit={() =>
          handleLogin((min: number, max: number) => getRandomNumber(min, max))
        }
        className="login_form"
      >
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
