import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create an interface representing image object.
export interface IImage {
  imageId: string;
  image: Buffer;
}

// Create a Schema correspondinsg to the document interface.
export const imageSchema = new Schema<IImage>({
  imageId: { type: String, required: true },
  image: { type: Buffer, required: true },
});

// Create a Model.
export const Image = model<IImage>('Image', imageSchema);
