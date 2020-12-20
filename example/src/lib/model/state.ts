import micoDb from "mico-db";
export interface RecordItem {
  index?: number;
  key?: string;
  event: string;
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
  add?: (cell: RecordCell, item: RecordItem) => void;
  remove?: (id: string) => Promise<RecordCell>;
  find?: (id: string) => Promise<RecordItem>;
}

export const proxy = {} as TATProxy;

export const state = {
  _: {
    recordList: (void 0 as any) as RecordCell[],
    recordItems: (void 0 as any) as RecordItem[],
  },
  recordList: {
    get: async () => {
      if (proxy.list) {
        const list = await proxy.list();
        await micoDb.set("record-list", list);
      }
      state._.recordList = await micoDb.get("record-list");
      return state._.recordList;
    },
    set: async (list: RecordCell[]) => {
      if (proxy.save) {
        await proxy.save(list);
      }
      state._.recordList = list;
      return micoDb.set("record-list", list);
    },
    add: async (cell: RecordCell, item: RecordItem) => {
      if (!state._.recordList) {
        await state.recordList.get();
      }
      state._.recordList.push(cell);
      if (proxy.add) {
        await proxy.add(cell, item);
      }
      micoDb.set(cell.id, item);
      return micoDb.set("record-list", state._.recordList);
    },
    find: async (id: string): Promise<RecordItem> => {
      if (!state._.recordList) {
        await state.recordList.get();
      }
      let cell: RecordCell = null as any;
      state._.recordList.forEach((v) => {
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
      if (!state._.recordList) {
        await state.recordList.get();
      }
      const list = [...state._.recordList];
      state._.recordList = [];
      let cell: RecordCell = null as any;
      list.forEach((v) => {
        if (v.id !== id) {
          state._.recordList.push(v);
        } else {
          cell = v;
        }
      });
      if (proxy.remove) {
        await proxy.remove(id);
      }
      await micoDb.set("record-list", state._.recordList);
      return cell;
    },
  },
  speed: {
    get: () => {
      return micoDb.getSessionStorage("record-speed");
    },
    set: (speed: number) => {
      micoDb.setSessionStorage("record-speed", speed);
    },
  },
  recordItems: {
    get: () => {
      state._.recordItems = micoDb.getSessionStorage(
        "record-recordEvents"
      ) as RecordItem[];
      return state._.recordItems;
    },
    set: (events: RecordItem[]) => {
      state._.recordItems = events;
      micoDb.setSessionStorage("tat-recordEvents", events);
    },
    add: (event: RecordItem) => {
      if (!state._.recordItems) {
        state.recordItems.get();
      }
      state._.recordItems.push(event);
      micoDb.setSessionStorage("tat-recordEvents", state._.recordItems);
    },
  },
  recording: {
    get: () => {
      return micoDb.getSessionStorage("tat-replaying");
    },
    set: (replaying: number) => {
      micoDb.setSessionStorage("tat-replaying", replaying);
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
