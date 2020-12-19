import "./renderMouse";
import { IReplay } from "./cache";
declare const replay: (options: IReplay, isAuto?: boolean | undefined) => Promise<void>;
export default replay;
