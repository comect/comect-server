// istanbul ignore
import { BatchModel } from "../../src/domain/batch/model";

export async function createBatch(
  name: string,
  growerId: string,
  location: any,
  override = {}
) {
  return BatchModel.create({
    name,
    growerId,
    location,
    ...override,
  });
}

export async function getBatch(id: string) {
  return BatchModel.findById(id);
}
