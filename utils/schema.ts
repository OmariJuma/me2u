import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

export const chatSchema = new mongoose.Schema({
    senderId:{
        type: String,
        required: true
    },
    receiverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    }
    
});

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
      type: String,
      required: true
    },
    profilePicUrl:{
        type: String,
        required: true
    }
   
})

