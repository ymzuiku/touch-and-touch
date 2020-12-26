import { createMicoDb } from "mico-db";
const micoDb = createMicoDb("tat");

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
  _id: string;
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
  onAlt: false,
  ui: micoDb.collection("ui", {
    type: "sessionStorage",
    firstItem: {
      speed: 1,
      showMouse: 0,
      lastFocus: null as any,
      showList: 1,
      showPlayList: 1,
      showInputId: "",
      recording: 0,
      replaying: 0,
      step: -1,
      filter: "",
      waitTimeout: 5000,
    },
  }),
  nowCell: micoDb.collection<RecordCell>("nowCell"),
  recordList: micoDb.collection<RecordCell>("record-list", {
    sort: { updateAt: -1 },
  }),
  recordItems: micoDb.collection<RecordItem>("record-item"),
};

// 初始化数据
// state.recordItems.get();
// state.recordList.get();
