import { state } from "./state";

export const remove = async (id: string) => {
  await state.recordList.deleteMany({ id });
  aoife.next(".tat-play-list");
};
