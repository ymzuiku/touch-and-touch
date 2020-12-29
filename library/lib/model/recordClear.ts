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
        }
      ))
    ) {
      return;
    }
  }
  // state.ui.updateOne(
  //   {},
  //   {
  //     recording: 0,
  //     replaying: 0,
  //     showList: 1,
  //   }
  // );
  // state.recordItems.set([]);
  await state.recordList.updateOne({ _id: id }, { items: [], step: 0 });
  aoife.next(".tat-update");
};
