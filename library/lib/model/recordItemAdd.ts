import { RecordItem, state } from "./state";

export const recordItemAdd = async (event: RecordItem) => {
  const ui = await state.ui.findOne();
  // 播放和录制过程，不再重新记录
  if (ui.recording && !ui.replaying) {
    await state.recordItems.insertOne(event);
    const step = await state.recordItems.count();
    state.nowCell.updateOne({}, { step });
    aoife.next(".tat-step");
  }
};