import { RecordCell } from "./state";
export interface InitOptions {
    multiplePage?: boolean;
    speed?: number;
    waitTimeout?: number;
    onFail?: (cell: RecordCell, error: string) => any;
    onSuccess?: (cell: RecordCell) => any;
    onReplay?: (cell: RecordCell) => any;
    onChangeData?: (cells: RecordCell[]) => any;
    onChangeSelected?: (cell: RecordCell) => any;
    autoPlayItem?: string;
}
export declare const initOpt: InitOptions;
export declare const init: (opt?: InitOptions) => Promise<void>;
