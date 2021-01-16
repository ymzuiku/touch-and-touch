import Message from "vanilla-message";
import { recordContinue } from "./recordContinue";
import { state } from "./state";

export const recordAgain = async () => {
  const nowCell = await state.nowCell.findOne();
  let right = true;
  console.log(nowCell);
  if (nowCell && nowCell.items && nowCell.items.length > 1) {
    right = await Message.error("Clear now item, and record again?", {
      ok: "Ok",
      cancel: "Cancel",
      style: { zIndex: 16100 },
    });
  }

  if (right) {
    await state.nowCell.updateOne({}, { step: 0, items: [] });
    await state.recordItems.deleteMany();
    recordContinue();
  }
};
