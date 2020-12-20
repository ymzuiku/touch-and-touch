import { RecordOnce } from "./recordHelps";
export interface TATOptions {
    hiddenButtons?: boolean;
    tags?: string[];
    recordOnce?: RecordOnce;
    events?: any;
    speed?: number;
}
declare const record: ({ recordOnce, tags }: TATOptions) => void;
export default record;
