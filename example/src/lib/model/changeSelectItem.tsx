import { state } from "./state";

export const changeSelectItem = async (id: string) => {
  const list = await state.recordList.findOne({ id });
  if (!list) {
    return;
  }
  const items = list.items;
  state.nowCell.set(list);
  await state.recordItems.set(items);
  aoife.next(".tat-plan");
};
