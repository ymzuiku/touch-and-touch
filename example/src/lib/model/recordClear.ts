import { getTitle } from "./getTitle";
import { state } from "./state";

export const recordClear = async () => {
  const lastCell = await state.nowCell.findOne();
  if (lastCell.step === 0) {
    return;
  }
  if (!state.onAlt) {
    if (!confirm(`Is clear [${lastCell.step}]${getTitle(lastCell)} steps?`)) {
      return;
    }
  }
  state.ui.updateOne(
    {},
    {
      recording: 0,
      replaying: 0,
      showList: 1,
    }
  );
  state.recordItems.set([]);
  state.nowCell.updateOne({}, { items: [], step: 0 });
  const cell = await state.nowCell.findOne();
  await state.recordList.updateOne({ _id: cell._id }, cell);
  aoife.next(".tat-plan");
};
