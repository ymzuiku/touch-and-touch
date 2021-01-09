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
export declare const proxy: TATProxy;
export declare const state: {
    onAlt: boolean;
    ui: import("mico-db/umd/item").Item<{
        speed: number;
        showMouse: number;
        lastFocus: any;
        showList: number;
        showInputId: string;
        recording: number;
        replaying: number;
        replayingAll: number;
        autoRecordId: boolean;
        step: number;
        filter: string[];
        waitTimeout: number;
    }>;
    nowCell: {
        proxy: import("mico-db/umd/collection").ProxyCollection<RecordCell>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<RecordCell>;
        count: () => Promise<number>;
        find: (filter?: Partial<RecordCell> | ((val: RecordCell) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<RecordCell[]>;
        findOne: (filter?: Partial<RecordCell> | ((val: RecordCell) => any) | undefined) => Promise<RecordCell>;
        deleteMany: (filter?: Partial<RecordCell> | undefined) => Promise<RecordCell[]>;
        deleteOne: (filter?: Partial<RecordCell> | undefined) => Promise<RecordCell | undefined>;
        updateOne: (filter: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>, data: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>) => Promise<(RecordCell & import("mico-db/umd/collection").BaseColl) | undefined>;
        updateMany: (filter: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>, data: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>) => Promise<RecordCell[]>;
        insertOne: (data: Partial<RecordCell>) => Promise<RecordCell[]>;
        insertMany: (dataList: Partial<RecordCell>[]) => Promise<RecordCell[]>;
        removeDuplicatie: (key: string) => Promise<RecordCell[]>;
        set: (dataList: Partial<RecordCell>[]) => Promise<void>;
    };
    recordList: {
        proxy: import("mico-db/umd/collection").ProxyCollection<RecordCell>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<RecordCell>;
        count: () => Promise<number>;
        find: (filter?: Partial<RecordCell> | ((val: RecordCell) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<RecordCell[]>;
        findOne: (filter?: Partial<RecordCell> | ((val: RecordCell) => any) | undefined) => Promise<RecordCell>;
        deleteMany: (filter?: Partial<RecordCell> | undefined) => Promise<RecordCell[]>;
        deleteOne: (filter?: Partial<RecordCell> | undefined) => Promise<RecordCell | undefined>;
        updateOne: (filter: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>, data: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>) => Promise<(RecordCell & import("mico-db/umd/collection").BaseColl) | undefined>;
        updateMany: (filter: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>, data: Partial<RecordCell & import("mico-db/umd/collection").BaseColl>) => Promise<RecordCell[]>;
        insertOne: (data: Partial<RecordCell>) => Promise<RecordCell[]>;
        insertMany: (dataList: Partial<RecordCell>[]) => Promise<RecordCell[]>;
        removeDuplicatie: (key: string) => Promise<RecordCell[]>;
        set: (dataList: Partial<RecordCell>[]) => Promise<void>;
    };
    recordItems: {
        proxy: import("mico-db/umd/collection").ProxyCollection<RecordItem>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<RecordItem>;
        count: () => Promise<number>;
        find: (filter?: Partial<RecordItem> | ((val: RecordItem) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<RecordItem[]>;
        findOne: (filter?: Partial<RecordItem> | ((val: RecordItem) => any) | undefined) => Promise<RecordItem>;
        deleteMany: (filter?: Partial<RecordItem> | undefined) => Promise<RecordItem[]>;
        deleteOne: (filter?: Partial<RecordItem> | undefined) => Promise<RecordItem | undefined>;
        updateOne: (filter: Partial<RecordItem & import("mico-db/umd/collection").BaseColl>, data: Partial<RecordItem & import("mico-db/umd/collection").BaseColl>) => Promise<(RecordItem & import("mico-db/umd/collection").BaseColl) | undefined>;
        updateMany: (filter: Partial<RecordItem & import("mico-db/umd/collection").BaseColl>, data: Partial<RecordItem & import("mico-db/umd/collection").BaseColl>) => Promise<RecordItem[]>;
        insertOne: (data: Partial<RecordItem>) => Promise<RecordItem[]>;
        insertMany: (dataList: Partial<RecordItem>[]) => Promise<RecordItem[]>;
        removeDuplicatie: (key: string) => Promise<RecordItem[]>;
        set: (dataList: Partial<RecordItem>[]) => Promise<void>;
    };
    customEvent: {
        proxy: import("mico-db/umd/collection").ProxyCollection<any>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<any>;
        count: () => Promise<number>;
        find: (filter?: Partial<any> | ((val: any) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<any[]>;
        findOne: (filter?: Partial<any> | ((val: any) => any) | undefined) => Promise<any>;
        deleteMany: (filter?: Partial<any> | undefined) => Promise<any[]>;
        deleteOne: (filter?: Partial<any> | undefined) => Promise<any>;
        updateOne: (filter: Partial<any>, data: Partial<any>) => Promise<any>;
        updateMany: (filter: Partial<any>, data: Partial<any>) => Promise<any[]>;
        insertOne: (data: Partial<any>) => Promise<any[]>;
        insertMany: (dataList: Partial<any>[]) => Promise<any[]>;
        removeDuplicatie: (key: string) => Promise<any[]>;
        set: (dataList: Partial<any>[]) => Promise<void>;
    };
};
export {};
