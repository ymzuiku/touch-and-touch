import micoDb from "mico-db";

const _cache = micoDb.collection("tat-cache", { firstItem: {} });

export const cache = {
  get: async (key: string) => {
    const data = await (_cache.findOne() as any);
    return data[key];
  },
  set: async (key: string, value: any) => {
    await _cache.updateOne({}, { [key]: value });
    return value;
  },
};
