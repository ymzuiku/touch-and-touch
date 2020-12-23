import { RecordItem, state } from "./state";

export const recordItemAdd = async (event: RecordItem) => {
  // 播放和录制过程，不再重新记录
  if (state.ui.get().recording && !state.ui.get().replaying) {
    await state.recordItems.insertOne(event);
    const step = await state.recordItems.count();
    state.nowCell.set({ step });
    aoife.next(".tat-step");
  }
};
