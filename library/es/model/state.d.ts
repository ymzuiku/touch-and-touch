export interface RecordItem {
    index?: number;
    key: string;
    type: string;
    value?: string;
    mock?: string;
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
    ui: {
        proxy: import("mico-db/umd/collection").ProxyCollection<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }>;
        count: () => Promise<number>;
        find: (filter?: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }> | ((val: {
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }[]>;
        findOne: (filter?: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }> | ((val: {
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }) => any) | undefined) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }>;
        deleteMany: (filter?: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }> | undefined) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }[]>;
        deleteOne: (filter?: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }> | undefined) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        } | undefined>;
        updateOne: (filter: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        } & import("mico-db/umd/collection").BaseColl>, data: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        } & import("mico-db/umd/collection").BaseColl>) => Promise<({
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        } & import("mico-db/umd/collection").BaseColl) | undefined>;
        updateMany: (filter: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        } & import("mico-db/umd/collection").BaseColl>, data: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        } & import("mico-db/umd/collection").BaseColl>) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }[]>;
        insertOne: (data: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }>) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }[]>;
        insertMany: (dataList: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }>[]) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }[]>;
        removeDuplicatie: (key: string) => Promise<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }[]>;
        set: (dataList: Partial<{
            speed: number;
            showMouse: number;
            lastFocus: any;
            showList: number;
            showInputId: string;
            recording: number;
            replaying: number;
            step: number;
            filter: string[];
            waitTimeout: number;
        }>[]) => Promise<void>;
    };
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
};
export {};
