import { RecordItem, state } from "./state";

export const recordItemAdd = async (event: RecordItem) => {
  // 播放和录制过程，不再重新记录
  if (state.recording.get() && !state.replaying.get()) {
    state.recordItems.add(event);
    aoife.next(".tat-record-cell");
  }
};
