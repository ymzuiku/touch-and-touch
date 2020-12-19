import { IEvent } from "./IEvent";
declare type ISetEvent = (event: IEvent) => any;
declare const record: (fn?: ISetEvent | undefined) => void;
export default record;
