import { Schema, Document, model } from "mongoose";

export type Batch = {
  name: string;
  growerId: string;
  location: [number];
  createdAt: Date;
};

const batchSchema: Schema = new Schema({
  name: String,
  growerId: String,
  location: [Number],
  createdAt: { type: Schema.Types.Date, default: Date.now() },
}).index({
  location: "2dsphere",
});

export const BatchModel = model<Batch & Document>("Batch", batchSchema);
