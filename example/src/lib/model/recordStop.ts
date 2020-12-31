import { recordRemoveCustemEvent } from "./recordListenCustomEvent";
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
    }
  );
  aoife.next(".tat-update");
};
