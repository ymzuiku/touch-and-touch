import { RecordItem, state } from "./state";

export const recordItemAdd = async (event: RecordItem) => {
  const ui = state.ui.get();
  // 播放和录制过程，不再重新记录
  if (ui.recording && !ui.replaying) {
    await state.recordItems.insertOne(event);
    const step = await state.recordItems.count();
    await state.recordList.updateOne({ _id: ui.nowCellId }, { step });
    aoife.next(".tat-step, .tat-step");
  }
};
