import { state } from "./state";

export const changeSelectItem = async (id: string) => {
  const cell = await state.recordList.findCell(id);
  const items = await state.recordList.findItems(id);
  state.nowCell.set(cell);
  state.recordItems.set(items);
  aoife.next(".tat-plan");
};
