import { Schema, Document, model } from "mongoose";

// TODO: extend batch to plural and allow a serving to be composed of multiple batches

export type Serving = {
  brew: string;
  consumerId: string;
  location: [number];
  createdAt: Date;
};

const servingSchema: Schema = new Schema({
  brew: Schema.Types.ObjectId,
  consumerId: String,
  location: [Number],
  createdAt: { type: Schema.Types.Date, default: Date.now() },
}).index({
  location: "2dsphere",
});

export const ServingModel = model<Serving & Document>("Serving", servingSchema);
