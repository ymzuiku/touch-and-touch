import { state } from "./state";

export const recordStop = async () => {
  state.ui.set({
    recording: 0,
    showPlayList: 1,
    showExpend: 1,
  });

  const cell = state.nowCell.get();
  const items = await state.recordItems.find();
  await state.recordList.updateOne(
    { id: cell.id },
    {
      ...cell,
      items,
      updateAt: Date.now(),
    }
  );
  aoife.next(".tat-plan");
};
