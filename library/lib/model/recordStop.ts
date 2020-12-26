import { state } from "./state";

export const recordStop = async () => {
  await state.ui.updateOne(
    {},
    {
      recording: 0,
      showPlayList: 1,
    }
  );

  const cell = await state.nowCell.findOne();
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