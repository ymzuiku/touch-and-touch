import { IEvent } from "./IEvent";
declare const mouse: HTMLDivElement;
declare function mouseMove(event: IEvent): void;
declare function mouseClick(event: IEvent): void;
export { mouse, mouseClick, mouseMove };
