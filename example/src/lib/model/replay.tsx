import { state } from "./state";

export const replay = async (id: string) => {
  const cell = await state.recordList.findItems(id);
  state.replaying.set(1);
  alert(JSON.stringify(cell));
  aoife.next(".tat-ctrl");
};
