interface DragProps extends IProps {
    dragPadding?: number;
    localStorageKey?: string;
    clientX?: number;
    clientY?: number;
    query?: string;
}
export declare const Drag: ({ children, clientX, clientY, query, localStorageKey, dragPadding, style, ...rest }: DragProps) => HTMLElement;
export {};
