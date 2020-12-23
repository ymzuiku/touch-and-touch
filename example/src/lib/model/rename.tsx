import { state } from "./state";

export const rename = async (id: string, title: string) => {
  state.ui.set({
    showInputId: "",
  });
  const cell = await state.recordList.findOne({ id });
  if (!cell) {
    return;
  }
  cell.title = title;
  await state.recordList.updateOne({ id }, cell);
  aoife.next(".tat-play-list .cell");
};
