import { getTitle } from "./getTitle";
import { state } from "./state";

export const remove = async (id: string) => {
  const data = await state.recordList.findOne({ _id: id });
  if (!confirm(`Is delete: [${data.step}]${getTitle(data)} ?`)) {
    return;
  }
  await state.recordList.deleteMany({ _id: id });
  aoife.next(".tat-play-list");
};
