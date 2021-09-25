import { Schema, Document, model } from "mongoose";

// TODO: extend batch to plural and allow a brew to be composed of multiple batches

export type Brew = {
  name: string;
  producerId: string;
  batch: string;
  location: [number];
};

const brewSchema: Schema = new Schema({
  name: String,
  producerId: String,
  batch: Schema.Types.ObjectId,
  location: [Number],
}).index({
  location: "2dsphere",
});

export const BrewModel = model<Brew & Document>("Brew", brewSchema);
