interface DragProps extends IProps {
    localStorageKey?: string;
    clientX?: number;
    clientY?: number;
    query?: string;
}
export declare const Drag: ({ children, clientX, clientY, query, localStorageKey, style, ...rest }: DragProps) => HTMLElement;
export {};
