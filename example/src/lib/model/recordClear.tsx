import { getTitle } from "./getTitle";
import { state } from "./state";

export const recordClear = async () => {
  const lastCell = state.nowCell.get();
  if (lastCell.step === 0) {
    return;
  }
  if (!confirm(`Is clear [${lastCell.step}]${getTitle(lastCell)} steps?`)) {
    return;
  }
  state.ui.set({
    recording: 0,
    replaying: 0,
    showList: 1,
  });
  state.recordItems.set([]);
  state.nowCell.set({ items: [], step: 0 });
  const cell = state.nowCell.get();
  await state.recordList.updateOne({ _id: cell._id }, cell);
  aoife.next(".tat-plan");
};
