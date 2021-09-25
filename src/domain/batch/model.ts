import { Schema, Document, model } from "mongoose";

export type Batch = {
  name: string;
  growerId: string;
  location: unknown;
};

const batchSchema: Schema = new Schema({
  name: String,
  growerId: Schema.Types.ObjectId,
  location: Schema.Types.Mixed,
});

export const BatchModel = model<Batch & Document>("Batch", batchSchema);
