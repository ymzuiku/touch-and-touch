import MicoDb from "mico-db";

const _cache = MicoDb("tat-db").collection("tat-cache", { init: {} });

export const cache = {
  get: async (key: string) => {
    const data = await (_cache.findOne() as any);
    return data[key];
  },
  set: async (key: string, value: any) => {
    await _cache.updateOne({}, { $set: { [key]: value } });
    return value;
  },
};
