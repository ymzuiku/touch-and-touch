import { state } from "./state";

export const findCellDate = async (id: string) => {
  const cell = await state.recordList.findOne({ _id: id });
  return JSON.stringify(cell.items, null, 2);
};
