import aoife from "aoife";
import { changeSelectItem } from "./changeSelectItem";
import { getTitle } from "./getTitle";
import { recordCellAdd } from "./recordCellAdd";
import { recordDom } from "./recordDom";
import { replayAllFilter } from "./replayAllFilter";
import { replayStart } from "./replayStart";
import { RecordCell, state, initState } from "./state";

export interface InitOptions {
  name: string;
  speed?: number;
  waitTimeout?: number;
  lockCtrlKey?: string;
  useAutoId?: boolean;
  useRecordMouse?: boolean;
  useRecordInput?: boolean;
  onFail?: (cell: RecordCell, error: string) => any;
  onSuccess?: (cell: RecordCell) => any;
  onReplay?: (cell: RecordCell) => any;
  onChangeData?: (cells: RecordCell[]) => any;
  onChangeSelected?: (cell: RecordCell) => any;
  initData?: () => Promise<RecordCell[]>;
  autoPlayItem?: string;
  valueProxy?: {
    set: any;
    get: any;
  };
}

export const initOpt: InitOptions = { name: "tatdb", lockCtrlKey: "l" };

export const init = async (opt: InitOptions) => {
  Object.assign(initOpt, opt);
  initState(opt.name);
  if (opt.lockCtrlKey) {
    opt.lockCtrlKey = opt.lockCtrlKey.toLocaleLowerCase();
  }
  const ui = state.ui.get();
  if (initOpt.initData && !ui.replaying && !ui.recording) {
    const list = await initOpt.initData();
    await state.recordList.deleteMany();
    await state.recordList.insertMany(list);
  }
  let list = await state.recordList.find();
  // 若列表为空，初始化一个内容
  if (list.length === 0) {
    await recordCellAdd();
    list = await state.recordList.find();
  }

  const old = await state.recordList.findOne({ _id: ui.nowCellId });
  if (!old) {
    if (list && list[list.length - 1]) {
      await changeSelectItem(list[list.length - 1]._id);
    }
  } else {
    await changeSelectItem(old._id);
  }

  aoife.next(".tat-update");

  state.ui.merge({
    speed: opt.speed || 1,
    waitTimeout: opt.waitTimeout || 5000,
  });

  recordDom();
  state.recordList.onChange = initOpt.onChangeData;

  setTimeout(async () => {
    const ui = state.ui.get();
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
        state.ui.merge({ step: 0 });
        replayStart();
      }
    }
  });
};

let isHiddenRoot = false;
window.addEventListener("keydown", (e) => {
  if (e.key === "Alt") {
    state.onAlt = true;
  }
  if (e.ctrlKey && initOpt.lockCtrlKey && e.key === initOpt.lockCtrlKey) {
    const ele = document.querySelector(".tat-root") as HTMLElement;
    if (ele) {
      isHiddenRoot = !isHiddenRoot;
      ele.style.opacity = isHiddenRoot ? "0.1" : "1";
      ele.style.pointerEvents = isHiddenRoot ? "none" : "auto";
    }
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "Alt") {
    state.onAlt = false;
  }
});
