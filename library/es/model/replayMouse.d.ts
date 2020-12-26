import { RecordItem } from "./state";
declare const mouse: HTMLElement;
declare function mouseMove(item: RecordItem): void;
declare function mouseClick(item: RecordItem): Promise<void>;
export { mouse, mouseClick, mouseMove };
