import { TATOptions } from "./record";
declare const _default: (opt?: TATOptions) => {
    save: () => void;
    replay: () => Promise<void>;
    stopReplay: () => void;
};
export default _default;
