import { state } from "./state";

export const remove = async (id: string) => {
  await state.recordList.deleteMany({ _id: id });
  aoife.next(".tat-play-list");
};
