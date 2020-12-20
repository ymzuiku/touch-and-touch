import { IEvent } from "./IEvent";
export declare type RecordOnce = (event: IEvent) => any;
export declare const getTATKey: (el: any) => string;
export declare function getAttrAndCloseAttr(item: HTMLElement, key: string): string;
export declare const loadPageKey: () => string;
export declare function setTATAutoId(item: HTMLInputElement, recordOnce: RecordOnce): void;
export declare function querySetTATId(el: HTMLElement, recordOnce?: RecordOnce): void;
