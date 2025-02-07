import mongoose from "mongoose";
import {chatSchema, userSchema} from "./schema";

export const chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export const user= mongoose.models.User || mongoose.model("User", userSchema);
