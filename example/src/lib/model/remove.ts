import Message from "vanilla-message";
import { getTitle } from "./getTitle";
import { state } from "./state";

export const remove = async (id: string) => {
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
