import { state } from "./state";

export const recordStop = async () => {
  state.ui.set({
    recording: 0,
    showPlayList: 1,
  });

  const cell = state.nowCell.get();
  const items = await state.recordItems.find();
  await state.recordList.updateOne(
    { _id: cell._id },
    {
      ...cell,
      items,
      updateAt: Date.now(),
    }
  );
  aoife.next(".tat-plan");
};
