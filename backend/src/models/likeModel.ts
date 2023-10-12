import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create an interface representing like object.
export interface ILike {
  userId: string;
  recipeId: string;
}

// Create a Schema correspondinsg to the document interface.
export const likeSchema = new Schema<ILike>({
  userId: { type: String, required: true },
  recipeId: { type: String, required: true },
});

// Create a Model.
export const Like = model<ILike>('Like', likeSchema);
