import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { recordDom } from "./recordDom";
import { state } from "./state";

export const init = async () => {
  const list = await state.recordList.list();
  if (list && list[list.length - 1]) {
    await changeSelectItem(list[list.length - 1].id);
  }
  aoife.next(".tat-plan");
  recordDom();
};
