import { IEvent } from "./IEvent";

export interface IReplay {
  speed: number;
  events: IEvent[];
}

export interface ICache {
  lastFocus?: HTMLInputElement;
}

export const cache: IReplay & ICache = {
  speed: 1,
  events: [],
  lastFocus: null as any,
};
