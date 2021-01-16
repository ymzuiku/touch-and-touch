import micoDb, { createMicoDb } from "mico-db";

export interface RecordItem {
  index?: number;
  id?: string;
  key?: string;
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

let db = micoDb;

export const initState = (name: string) => {
  db = createMicoDb(name);
  state.ui = db.sessionItem("ui", baseUI);
  state.recordList = db.collection<RecordCell>("record-list", {
    sort: { updateAt: -1 },
  });
  state.recordItems = db.collection<RecordItem>("record-item");
  state.customEvent = db.collection<any>("custom-event", {
    type: "sessionStorage",
  });
};

const baseUI = {
  speed: 1,
  showMouse: 0,
  lastFocus: null as any,
  showList: 1,
  showInputId: "",
  recording: 0,
  replaying: 0,
  replayingAll: 0,
  nowCellId: "",
  autoRecordId: false,
  step: 0,
  filter: [] as string[],
  waitTimeout: 5000,
};

export const state = {
  onAlt: false,
  ui: db && db.sessionItem("ui", baseUI),
  recordList: db.collection<RecordCell>("record-list", {
    sort: { updateAt: -1 },
  }),
  recordItems: db.collection<RecordItem>("record-item"),
  customEvent: db.collection<any>("custom-event", {
    type: "sessionStorage",
  }),
};
