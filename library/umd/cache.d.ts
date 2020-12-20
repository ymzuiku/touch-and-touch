import { IEvent } from "./IEvent";
export interface IReplay {
    speed: number;
    events: IEvent[];
    onUpdate?: () => any;
}
export interface ICache {
    lastFocus?: HTMLInputElement;
}
export declare const cache: IReplay & ICache;
