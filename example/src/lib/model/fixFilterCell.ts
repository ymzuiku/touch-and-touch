import { getTitle } from "./getTitle";
import { RecordCell, state } from "./state";

export const fixFilterCell = async (cell: RecordCell) => {
  const ui = await state.ui.findOne();
  const filter = ui.filter;
  if (!filter || !filter.length) {
    return true;
  }
  if (!cell) {
    return false;
  }
  const title = getTitle(cell);
  let isShow = false;
  filter.forEach((f) => {
    if (f && new RegExp(f).test(title)) {
      isShow = true;
    }
  });
  return isShow;
};
