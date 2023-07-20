import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create an interface representing user object.
export interface IUser {
  userId: string;
  name: string;
  email: string;
  description: string;
  private: boolean;
  recipes: string[];
  favorites: string[];
}

// Create a Schema correspondinsg to the document interface.
export const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  description: { type: String, required: false },
  private: { type: Boolean, required: false },
  recipes: { type: [String], required: false },
  favorites: { type: [String], required: false },
});

// Create a Model.
export const User = model<IUser>('User', userSchema);
