import aoife from "aoife";
import { state } from "./state";

export const init = async () => {
  await state.recordList.list();
  await state.recordItems.get();
  aoife.next(".tat-plan");
};
