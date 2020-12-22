import { state } from "./state";

export const recordStop = async () => {
  state.recording.set(0);
  state.showPlayList = true;
  state.showExpend = true;
  const cell = state.nowCell;
  await state.recordList.update(cell.id, true, {
    ...cell,
    updateAt: Date.now(),
  });
  aoife.next(".tat-plan");
};
