import { state } from "./state";

export const rename = async (id: string, title: string) => {
  state.showInputId = "";
  const cell = await state.recordList.findCell(id);
  cell.title = title;
  await state.recordUpdate(id, cell);
  aoife.next(".tat-cell");
};
