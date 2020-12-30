import { RecordCell } from "./state";
export interface InitOptions {
    speed?: number;
    waitTimeout?: number;
    onFail?: (cell: RecordCell, error: string) => any;
    onSuccess?: (cell: RecordCell) => any;
    onReplay?: (cell: RecordCell) => any;
    onChangeData?: (cells: RecordCell[]) => any;
    onChangeSelected?: (cell: RecordCell) => any;
    initData?: () => Promise<RecordCell[]>;
    autoPlayItem?: string;
    autoUseContext?: boolean | number;
    valueProxy?: {
        set: any;
        get: any;
    };
}
export declare const initOpt: InitOptions;
export declare const init: (opt?: InitOptions) => Promise<void>;
