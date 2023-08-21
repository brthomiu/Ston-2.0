import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create an interface representing user stats.
export interface IUserStats {
  likes: number;
  recipes: number;
  follows: number;
  followers: number;
  recipeLikes: number;
}

// Create a Schema corresponding to the stats interface.
const userStatsSchema = new Schema<IUserStats>({
  likes: { type: Number, required: false },
  recipes: { type: Number, required: false },
  follows: { type: Number, required: false },
  followers: { type: Number, required: false },
  recipeLikes: { type: Number, required: false },
});

// Create an interface representing user object.
export interface IUser {
  userId: string;
  name: string;
  displayName: string;
  email: string;
  description: string;
  private: boolean;
  recipes: string[];
  favorites: string[];
  newUser: boolean;
  stats: IUserStats;
}

// Create a Schema correspondinsg to the document interface.
export const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: false },
  email: { type: String, required: true },
  description: { type: String, required: false },
  private: { type: Boolean, required: false },
  recipes: { type: [String], required: false },
  favorites: { type: [String], required: false },
  newUser: { type: Boolean, required: false },
  stats: { type: userStatsSchema, required: false },
});

// Create a Model.
export const User = model<IUser>('User', userSchema);
