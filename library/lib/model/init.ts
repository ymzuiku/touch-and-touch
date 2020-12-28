import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { getTitle } from "./getTitle";
import { recordCellAdd } from "./recordCellAdd";
import { recordDom } from "./recordDom";
import { replayAllFilter } from "./replayAllFilter";
import { replayStart } from "./replayStart";
import { RecordCell, state } from "./state";

export interface InitOptions {
  speed?: number;
  waitTimeout?: number;
  onFail?: (cell: RecordCell, error: string) => any;
  onSuccess?: (cell: RecordCell) => any;
  onReplay?: (cell: RecordCell) => any;
  onChangeData?: (cells: RecordCell[]) => any;
  onChangeSelected?: (cell: RecordCell) => any;
  autoPlayItem?: string;
}

export const initOpt: InitOptions = {};

window.addEventListener("keydown", (e) => {
  if (e.key === "Alt") {
    state.onAlt = true;
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "Alt") {
    state.onAlt = false;
  }
});

export const init = async (opt: InitOptions = {}) => {
  Object.assign(initOpt, opt);
  state.recordList.proxy.onChange = initOpt.onChangeData;
  let list = await state.recordList.find();
  // 若列表为空，初始化一个内容
  if (list.length === 0) {
    await recordCellAdd();
    list = await state.recordList.find();
  }

  const old = await state.nowCell.findOne();
  if (!old._id) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1]._id);
    }
  } else {
    const next = await state.nowCell.findOne();
    await changeSelectItem(next._id);
  }

  aoife.next(".tat-update");

  await state.ui.updateOne(
    {},
    { speed: opt.speed || 1, waitTimeout: opt.waitTimeout || 5000 }
  );

  recordDom();
  setTimeout(async () => {
    const ui = await state.ui.findOne();
    if (ui.replaying) {
      if (ui.replayingAll) {
        replayAllFilter();
      } else {
        replayStart();
      }
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
        await state.ui.updateOne({}, { step: 0 });
        replayStart();
      }
    }
  });
};
