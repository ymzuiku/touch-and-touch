import { initOpt } from "./init";
import { state } from "./state";

export const changeSelectItem = async (id: string) => {
  const cell = await state.recordList.findOne({ _id: id });
  if (!cell) {
    return;
  }
  const items = cell.items;
  state.ui({ nowCellId: cell._id });
  await state.recordItems.setAll(items);
  if (initOpt.onChangeSelected) {
    initOpt.onChangeSelected(cell);
  }
  aoife.next(".tat-update");
};
