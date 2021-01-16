import Message from "vanilla-message";
import { getTitle } from "./getTitle";
import { state } from "./state";

export const recordClear = async (id: string) => {
  const lastCell = await state.recordList.findOne({ _id: id });
  if (lastCell.step === 0) {
    return;
  }
  if (!state.onAlt) {
    if (
      !(await Message.info(
        `Is clear this steps: [${lastCell.step}]${getTitle(lastCell)}?`,
        {
          ok: "Ok",
          cancel: "Cancel",
          style: { zIndex: 16000 },
        }
      ))
    ) {
      return;
    }
  }
  await state.recordList.updateOne(
    { _id: id },
    { $set: { items: [], step: 0 } }
  );
  aoife.next(".tat-update");
};
