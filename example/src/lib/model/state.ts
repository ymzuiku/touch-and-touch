import micoDb from "mico-db";
export interface IEvent {
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

export const state = {
  _: {
    recordEvents: [] as IEvent[],
  },
  speed: {
    get: () => {
      return micoDb.getSessionStorage("record-speed");
    },
    set: (speed: number) => {
      micoDb.setSessionStorage("record-speed", speed);
    },
  },
  recordEvents: {
    get: () => {
      state._.recordEvents = micoDb.getSessionStorage(
        "record-recordEvents"
      ) as IEvent[];
      return state._.recordEvents;
    },
    set: (events: IEvent[]) => {
      state._.recordEvents = events;
      micoDb.setSessionStorage("record-recordEvents", events);
    },
    add: (event: IEvent) => {
      state._.recordEvents.push(event);
      micoDb.setSessionStorage("record-recordEvents", state._.recordEvents);
    },
  },
  replaying: {
    get: () => {
      return micoDb.getSessionStorage("record-replaying");
    },
    set: (replaying: number) => {
      micoDb.setSessionStorage("record-replaying", replaying);
    },
  },
  replayNum: {
    get: () => {
      return micoDb.getSessionStorage("record-replayNum");
    },
    set: (num: number) => {
      micoDb.setSessionStorage("record-replayNum", num);
    },
  },
};
