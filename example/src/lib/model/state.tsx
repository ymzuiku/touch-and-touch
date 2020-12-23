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

const listColl = micoDb.collection("recordList");

export const state = {
  showMouse: false,
  lastFocus: null as any,
  showList: true,
  showPlayList: true,
  showExpend: true,
  showInputId: "",
  data: {
    recordList: [] as RecordCell[],
    recordItems: [] as RecordItem[],
  },
  nowCell: {
    set: (cell: RecordCell) => {
      micoDb.setSessionStorage("tat-nowCell", cell);
    },
    get: (): RecordCell => {
      return micoDb.getSessionStorage("tat-nowCell");
    },
  },
  recordList: {
    list: async (): Promise<RecordCell[]> => {
      if (proxy.list) {
        const list = await proxy.list();
        await micoDb.set("tat-list", list);
      }
      state.data.recordList = (await micoDb.get("tat-list")) || [];
      return state.data.recordList;
    },
    save: async (list: RecordCell[]) => {
      if (proxy.save) {
        await proxy.save(list);
      }
      state.data.recordList = list;
      return micoDb.set("tat-list", list);
    },
    add: async (cell: RecordCell, item: RecordItem[]) => {
      if (!state.data.recordList) {
        await state.recordList.list();
      }
      state.data.recordList.push(cell);
      if (proxy.add) {
        await proxy.add(cell, item);
      }
      micoDb.set(cell.id, item);
      state.data.recordList = state.data.recordList.sort(
        (a, b) => b.updateAt - a.updateAt
      );
      return micoDb.set("tat-list", state.data.recordList);
    },
    findCell: async (id: string): Promise<RecordCell> => {
      if (!state.data.recordList) {
        await state.recordList.list();
      }
      let cell: RecordCell = null as any;
      state.data.recordList.forEach((v) => {
        if (v.id === id) {
          cell = v;
        }
      });

      return cell;
    },
    findItems: async (id: string): Promise<RecordItem[]> => {
      if (!state.data.recordList) {
        await state.recordList.list();
      }
      let cell: RecordCell = null as any;
      state.data.recordList.forEach((v) => {
        if (v.id === id) {
          cell = v;
        } else {
        }
      });
      if (proxy.find) {
        await proxy.find(id);
      }
      if (cell) {
        return micoDb.get(cell.id);
      }
      return null as any;
    },
    remove: async (id: string): Promise<RecordCell> => {
      if (!state.data.recordList) {
        await state.recordList.list();
      }
      const list = [...state.data.recordList];
      state.data.recordList = [];
      let cell: RecordCell = null as any;
      list.forEach((v) => {
        if (v.id !== id) {
          state.data.recordList.push(v);
        } else {
          cell = v;
        }
      });
      if (proxy.remove) {
        await proxy.remove(id);
      }
      await micoDb.set("tat-list", state.data.recordList);
      return cell;
    },
    update: async (
      id: string,
      isUpdateItem: boolean,
      cell: RecordCell
    ): Promise<void> => {
      if (!state.data.recordList) {
        await state.recordList.list();
      }
      state.data.recordList.forEach((v) => {
        if (v.id === id) {
          Object.assign(v, cell);
        }
      });
      const items = state.recordItems.get();
      if (isUpdateItem) {
        await micoDb.set(cell.id, items);
      }
      if (proxy.update) {
        await proxy.update(id, cell, items);
      }
      await micoDb.set("tat-list", state.data.recordList);
    },
  },
  speed: {
    get: () => {
      return micoDb.getSessionStorage("tat-speed");
    },
    set: (speed: number) => {
      micoDb.setSessionStorage("tat-speed", speed);
    },
  },
  recordItems: {
    get: () => {
      state.data.recordItems = (micoDb.getSessionStorage("tat-recordEvents") ||
        []) as RecordItem[];
      return state.data.recordItems;
    },
    set: (events: RecordItem[]) => {
      state.data.recordItems = events;
      micoDb.setSessionStorage("tat-recordEvents", events);
    },
    add: (event: RecordItem) => {
      if (!state.data.recordItems) {
        state.recordItems.get();
      }
      state.data.recordItems.push(event);
      micoDb.setSessionStorage("tat-recordEvents", state.data.recordItems);
    },
  },
  recording: {
    get: () => {
      return micoDb.getSessionStorage("tat-recording");
    },
    set: (replaying: number) => {
      micoDb.setSessionStorage("tat-recording", replaying);
    },
  },
  replaying: {
    get: () => {
      return micoDb.getSessionStorage("tat-replaying");
    },
    set: (replaying: number) => {
      micoDb.setSessionStorage("tat-replaying", replaying);
    },
  },
  replayStep: {
    get: () => {
      return micoDb.getSessionStorage("tat-replayStep");
    },
    set: (num: number) => {
      micoDb.setSessionStorage("tat-replayStep", num);
    },
  },
};

// 初始化数据
// state.recordItems.get();
// state.recordList.get();
