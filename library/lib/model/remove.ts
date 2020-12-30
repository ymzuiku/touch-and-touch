import Message from "vanilla-message";
import { getTitle } from "./getTitle";
import { state } from "./state";

export const remove = async (id: string) => {
  // const num = await state.recordList.count();
  // if (num === 1) {
  //   return Message.error("Can't remove last file");
  // }
  const data = await state.recordList.findOne({ _id: id });
  if (!state.onAlt) {
    if (
      !(await Message.info(`Is delete: [${data.step}]${getTitle(data)} ?`, {
        ok: "Ok",
        cancel: "Cancel",
      }))
    ) {
      return;
    }
  }
  await state.recordList.deleteMany({ _id: id });
  aoife.next(".tat-play-list");
};
