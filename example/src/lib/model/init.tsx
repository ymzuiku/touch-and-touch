import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { recordCellAdd } from "./recordCellAdd";
import { recordDom } from "./recordDom";
import { replayStart } from "./replayStart";
import { RecordCell, RecordItem, state } from "./state";

export interface InitOptions {
  speed?: number;
  waitTimeout?: number;
  onFail?: (cell: RecordCell, error: string) => any;
  onSuccess?: (cell: RecordCell) => any;
  onReplay?: (cell: RecordCell) => any;
  onChangeList?: (cells: RecordCell[]) => any;
  autoPlaylist?: (name: string) => any;
}

export let initOpt: InitOptions;

export const init = async (opt: InitOptions = {}) => {
  initOpt = opt;
  state.recordList.proxy.onChange = initOpt.onChangeList;
  let list = await state.recordList.find();
  // 若列表为空，初始化一个内容
  if (list.length === 0) {
    await recordCellAdd();
    list = await state.recordList.find();
  }

  if (!state.nowCell.get().id) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1].id);
    }
  } else {
    await changeSelectItem(state.nowCell.get().id);
  }

  aoife.next(".tat-plan");

  state.ui.set({ speed: opt.speed || 1, waitTimeout: opt.waitTimeout || 5000 });
  recordDom();
  setTimeout(() => {
    if (state.ui.get().replaying) {
      replayStart();
    }
  });
};
