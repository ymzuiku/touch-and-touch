import { RecordCell } from "./state";
export interface InitOptions {
    name: string;
    speed?: number;
    waitTimeout?: number;
    useAutoId?: boolean;
    useRecordMouse?: boolean;
    useRecordInput?: boolean;
    onFail?: (cell: RecordCell, error: string) => any;
    onSuccess?: (cell: RecordCell) => any;
    onReplay?: (cell: RecordCell) => any;
    onChangeData?: (cells: RecordCell[]) => any;
    onChangeSelected?: (cell: RecordCell) => any;
    initData?: () => Promise<RecordCell[]>;
    autoPlayItem?: string;
    valueProxy?: {
        set: any;
        get: any;
    };
}
export declare const initOpt: InitOptions;
export declare const init: (opt: InitOptions) => Promise<void>;
