import { state } from "./state";

export const remove = async (id: string) => {
  await state.recordList.remove(id);
  aoife.next(".tat-list");
};
