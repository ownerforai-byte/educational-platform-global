import type { ObjectStore, ObjectPutInput, ObjectPutResult } from "../ports.js";
import { isR2StorageActive, r2Upload } from "../r2.js";

export const r2ObjectStore: ObjectStore = {
  name: "r2",
  isActive: () => isR2StorageActive(),
  async put(input: ObjectPutInput): Promise<ObjectPutResult> {
    const { url } = await r2Upload(input.path, input.buffer, input.contentType);
    return { path: input.path, publicUrl: url };
  },
};
