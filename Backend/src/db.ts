import mongoose from "mongoose";

const connectDB = () => {
  const mongoURI: string = "mongodb://localhost:27017/chat-app";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
