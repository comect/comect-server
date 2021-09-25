import { Schema, Document, model } from "mongoose";

export type Batch = {
  name: string;
  growerId: string;
  location: [number];
};

const batchSchema: Schema = new Schema({
  name: String,
  growerId: Schema.Types.ObjectId,
  location: [Number],
}).index({
  location: "2dsphere",
});

export const BatchModel = model<Batch & Document>("Batch", batchSchema);
