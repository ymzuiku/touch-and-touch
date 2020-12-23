import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { recordDom } from "./recordDom";
import { replayStart } from "./replayStart";
import { state } from "./state";

export const init = async () => {
  const list = await state.recordList.list();
  state.speed.set(1);
  if (!state.nowCell.get()) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1].id);
    }
  } else {
    await changeSelectItem(state.nowCell.get().id);
  }

  aoife.next(".tat-plan");
  recordDom();
  setTimeout(() => {
    if (state.replaying.get()) {
      replayStart();
    }
  });
};
