import { state } from "./state";

export const changeSelectItem = async (id: string) => {
  const cell = await state.recordList.findOne({ id });
  if (!cell) {
    return;
  }
  const items = cell.items;
  state.nowCell.set(cell);
  await state.recordItems.set(items);
  aoife.next(".tat-plan");
};
