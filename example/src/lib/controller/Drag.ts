/* eslint-disable indent */
import css from "template-css";
import { device } from "./device";
interface DragProps extends IProps {
  dragPadding?: number;
  localStorageKey?: string;
  clientX?: number;
  clientY?: number;
  query?: string;
}

function fixPosition(out = 100, state: { x: number; y: number }) {
  if (state.x < 0) {
    state.x = 0;
  } else if (state.x > window.innerWidth - out) {
    state.x = window.innerWidth - out;
  }
  if (state.y < 0) {
    state.y = 0;
  } else if (state.y > window.innerHeight - out) {
    state.y = window.innerHeight - out;
  }
}

export const Drag = ({
  children,
  clientX,
  clientY,
  query = "[tat-base-drag]",
  localStorageKey,
  dragPadding,
  style,
  ...rest
}: DragProps) => {
  const state = {
    onDrag: false,
    x: clientX || 0,
    y: clientY || 0,
    startX: 0,
    startY: 0,
    iw: window.innerWidth,
    ih: window.innerHeight,
  };
  let saveTime: any;
  const update = () => {
    const Ele = document.querySelector(query) as HTMLElement;
    if (Ele) {
      Ele.style.left = state.x - 4 + "px";
      Ele.style.top = state.y - 20 + "px";
    }

    if (localStorageKey) {
      if (saveTime) {
        clearTimeout(saveTime);
        saveTime = null;
      }
      saveTime = setTimeout(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }, 500);
    }
  };
  const onMove = (e: any) => {
    if (state.onDrag) {
      // if (e.clientX - state.startX < 20 && e.clientY - state.startY < 20) {
      //   return;
      // }
      state.x = e.clientX - state.startX;
      state.y = e.clientY - state.startY;
      fixPosition(dragPadding, state);
      // next("[tat-drag]");
      update();
    }
  };
  const onMoveEnd = () => {
    state.onDrag = false;
    update();
  };

  window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
      state.x -= state.iw - window.innerWidth;
      state.y -= state.ih - window.innerHeight;
      state.iw = window.innerWidth;
      state.ih = window.innerHeight;
      fixPosition(dragPadding, state);
      update();
    });
  });

  if (device().pc) {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onMoveEnd);
  } else {
    window.addEventListener("touchmove", (e) => {
      onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    });
    window.addEventListener("touchend", onMoveEnd);
  }

  if (localStorageKey) {
    const old = localStorage.getItem(localStorageKey);
    if (old) {
      try {
        const data = JSON.parse(old);
        state.x = data.x;
        state.y = data.y;
      } catch (err) {
        console.error(err);
      }
    }
  }
  fixPosition(dragPadding, state);
  aoife.waitAppend(query).then((ele) => {
    ele.style.position = "fixed";
    update();
  });

  const out = aoife(
    "div",
    {
      "tat-base-dray": 1,
      style: {
        cursor: "move",
        ...(style as any),
      },
      onmousedown: device().pc
        ? (e: any) => {
            state.onDrag = true;
            state.startX = e.offsetX;
            state.startX = e.offsetX;
          }
        : void 0,
      ontouchstart: device().phone
        ? (e: any) => {
            state.onDrag = true;
            if (e.touches && e.touches[0]) {
              state.startX = e.touches[0].clientX - state.x;
              state.startY = e.touches[0].clientY - state.y;
            }
          }
        : void 0,
      ...rest,
    },
    children
  );

  return out;
};
