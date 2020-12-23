import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { recordAdd } from "./recordAdd";
import { recordDom } from "./recordDom";
import { recordItemAdd } from "./recordItemAdd";
import { replayStart } from "./replayStart";
import { state } from "./state";

export const init = async () => {
  let list = await state.recordList.list();
  // 若列表为空，初始化一个内容
  if (list.length === 0) {
    await recordAdd();
    list = await state.recordList.list();
  }

  if (!state.nowCell.get()) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1].id);
    }
  } else {
    await changeSelectItem(state.nowCell.get().id);
  }

  aoife.next(".tat-plan");

  state.speed.set(1);
  recordDom();
  setTimeout(() => {
    if (state.replaying.get()) {
      replayStart();
    }
  });
};
