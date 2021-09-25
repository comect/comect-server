import { Schema, Document, model } from "mongoose";

export enum UserType {
  GROWER,
  PRODUCER,
  CONSUMER,
}

export type User = {
  name: string;
  type: UserType;
};

const userSchema: Schema = new Schema({
  name: String,
  type: String,
});

export const UserModel = model<User & Document>("User", userSchema);
