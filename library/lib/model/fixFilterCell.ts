import { getTitle } from "./getTitle";
import { RecordCell, state } from "./state";

export const fixFilterCell = async (cell: RecordCell) => {
  const ui = state.ui.get();
  const filter = ui.filter;
  if (!filter || !filter.length) {
    return true;
  }
  if (!cell) {
    return false;
  }
  const title = getTitle(cell);
  let isShow = false;
  filter.forEach((f: any) => {
    if (f && new RegExp(f).test(title)) {
      isShow = true;
    }
  });
  return isShow;
};
