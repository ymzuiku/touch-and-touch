// import { createMicoDb } from "mico-db";
// const micoDb = createMicoDb("tat");
import micoDb from "./mmDb";

export interface RecordItem {
  index?: number;
  key: string;
  type: string;
  value?: string;
  href?: string;
  clientX?: number;
  clientY?: number;
  scrollX?: number;
  scrollY?: number;
}
export interface RecordCell {
  id: string;
  title?: string;
  updateAt: number;
  step: number;
  items: RecordItem[];
}

interface TATProxy {
  list?: () => Promise<RecordCell[]>;
  save?: (list: RecordCell[]) => Promise<void>;
  add?: (cell: RecordCell, item: RecordItem[]) => Promise<void>;
  remove?: (id: string) => Promise<RecordCell>;
  find?: (id: string) => Promise<RecordItem>;
  update?: (id: string, cell: RecordCell, items: RecordItem[]) => Promise<void>;
}

export const proxy = {} as TATProxy;

export const state = {
  ui: micoDb.sessionItem("ui", {
    speed: 1,
    showMouse: 0,
    lastFocus: null as any,
    showList: 1,
    showPlayList: 1,
    showExpend: 1,
    showInputId: "",
    recording: 0,
    replaying: 0,
    replayStep: -1,
  }),
  nowCell: micoDb.sessionItem<RecordCell>("nowCell", {} as any),
  recordList: micoDb.collection<RecordCell>("record-list"),
  recordItems: micoDb.collection<RecordItem>("record-item"),
};

// 初始化数据
// state.recordItems.get();
// state.recordList.get();
