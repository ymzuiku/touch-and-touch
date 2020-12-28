import { recordRemoveCustemEvent } from "./customEvent";
import { state } from "./state";

export const recordStop = async () => {
  recordRemoveCustemEvent();
  await state.ui.updateOne(
    {},
    {
      recording: 0,
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
  aoife.next(".tat-update");
};
