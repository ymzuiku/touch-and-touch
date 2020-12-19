import { IEvent } from "./IEvent";
declare type OnSet = (event: IEvent) => any;
export interface TATOptions {
    tags?: string[];
    onSet?: OnSet;
}
declare const record: ({ onSet, tags }: TATOptions) => void;
export default record;
