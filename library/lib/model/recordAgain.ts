import Message from "vanilla-message";
import { recordContinue } from "./recordContinue";
import { state } from "./state";

export const recordAgain = async () => {
  const nowCell = await state.recordList.findOne({ _id: state.ui().nowCellId });
  let right = true;
  if (nowCell && nowCell.items && nowCell.items.length > 1) {
    right = await Message.error("Clear now item, and record again?", {
      ok: "Ok",
      cancel: "Cancel",
      style: { zIndex: 16100 },
    });
  }

  if (right) {
    await state.recordList.updateOne(
      { _id: state.ui().nowCellId },
      { $set: { step: 0, items: [] } }
    );
    await state.recordItems.deleteMany();
    recordContinue();
  }
};
