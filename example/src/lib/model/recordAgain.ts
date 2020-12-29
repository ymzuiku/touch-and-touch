import { recordContinue } from "./recordContinue";
import { state } from "./state";

export const recordAgain = async () => {
  await state.nowCell.updateOne({}, { step: 0, items: [] });
  await state.recordItems.deleteMany();
  recordContinue();
};
