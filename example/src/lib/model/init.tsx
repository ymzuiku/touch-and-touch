import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { getTitle } from "./getTitle";
import { recordCellAdd } from "./recordCellAdd";
import { recordDom } from "./recordDom";
import { replayStart } from "./replayStart";
import { RecordCell, state } from "./state";

export interface InitOptions {
  speed?: number;
  waitTimeout?: number;
  onFail?: (cell: RecordCell, error: string) => any;
  onSuccess?: (cell: RecordCell) => any;
  onReplay?: (cell: RecordCell) => any;
  onChangeData?: (cells: RecordCell[]) => any;
  autoPlayItem?: string;
}

export let initOpt: InitOptions;

export const init = async (opt: InitOptions = {}) => {
  initOpt = opt;
  state.recordList.proxy.onChange = initOpt.onChangeData;
  let list = await state.recordList.find();
  // 若列表为空，初始化一个内容
  if (list.length === 0) {
    await recordCellAdd();
    list = await state.recordList.find();
  }

  if (!state.nowCell.get()._id) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1]._id);
    }
  } else {
    await changeSelectItem(state.nowCell.get()._id);
  }

  aoife.next(".tat-plan");

  state.ui.set({ speed: opt.speed || 1, waitTimeout: opt.waitTimeout || 5000 });
  recordDom();
  setTimeout(async () => {
    if (state.ui.get().replaying) {
      replayStart();
    } else if (initOpt.autoPlayItem) {
      // 根据初始化参数自动播放
      const list = await state.recordList.find();
      const cell = list.find((v) => {
        const title = getTitle(v);
        if (title.indexOf(initOpt.autoPlayItem) > -1) {
          return true;
        }
      });
      if (cell) {
        await changeSelectItem(cell._id);
        state.ui.set({ step: -1 });
        replayStart();
      }
    }
  });
};
