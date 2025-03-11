import { timeStamp } from "console";
import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface Chat extends Document {
  sender: User;
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  username: string;
  avatar: string;
}

const chatSchema: Schema = new Schema(
  {
    sender: {
      username: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    msg: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Create Message model for mongoDB
const ChatModel = mongoose.model<Chat>("Chat", chatSchema);

// CRUD
export const findAllChats = async (): Promise<Chat[]> => {
  return (await ChatModel.find().sort({ timeStamp: 1 })).map((doc) =>
    doc.toObject()
  );
};

export const saveChat = async (chat: Chat): Promise<Chat> => {
  return await new ChatModel(chat).save();
};
