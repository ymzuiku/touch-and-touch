import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { recordCellAdd } from "./recordCellAdd";
import { recordDom } from "./recordDom";
import { replayStart } from "./replayStart";
import { state } from "./state";

export const init = async () => {
  let list = await state.recordList.find();
  // 若列表为空，初始化一个内容
  if (list.length === 0) {
    await recordCellAdd();
    list = await state.recordList.find();
  }

  if (!state.nowCell.get()) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1].id);
    }
  } else {
    await changeSelectItem(state.nowCell.get().id);
  }

  aoife.next(".tat-plan");

  state.ui.set({ speed: 1 });
  recordDom();
  setTimeout(() => {
    if (state.ui.get().replaying) {
      replayStart();
    }
  });
};
