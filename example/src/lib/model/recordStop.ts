import { recordRemoveCustemEvent } from "./recordListenCustomEvent";
import { state } from "./state";

export const recordStop = async () => {
  recordRemoveCustemEvent();
  state.ui.merge({
    recording: 0,
  });

  const items = await state.recordItems.find();
  await state.recordList.updateOne(
    { _id: state.ui().nowCellId },
    {
      $set: { updateAt: Date.now(), items },
    }
  );
  aoife.next(".tat-update");
};
