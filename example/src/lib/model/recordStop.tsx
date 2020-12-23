import { state } from "./state";

export const recordStop = async () => {
  state.ui.set({
    recording: 0,
    showPlayList: 1,
    showExpend: 1,
  });

  const cell = state.nowCell.get();
  await state.recordList.updateOne(
    { id: cell.id },
    {
      ...cell,
      updateAt: Date.now(),
    }
  );
  aoife.next(".tat-plan");
};
