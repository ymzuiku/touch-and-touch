interface DragProps extends IProps {
  localStorageKey?: string;
  clientX?: number;
  clientY?: number;
  query?: string;
}

function fixPosition(state: { x: number; y: number }) {
  const out = 60;
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
  style,
  ...rest
}: DragProps) => {
  let saveTime: any;
  const update = () => {
    const Ele = document.querySelector(query) as HTMLElement;
    if (Ele) {
      Ele.style.left = state.x + "px";
      Ele.style.top = state.y + "px";
    }
  };
  const onMove = (e: any) => {
    if (state.onDrag) {
      state.x = e.clientX - state.startX;
      state.y = e.clientY - state.startY;
      fixPosition(state);
      // next("[tat-drag]");
      update();
      if (localStorageKey) {
        if (saveTime) {
          clearTimeout(saveTime);
          saveTime = null;
        }
        saveTime = setTimeout(() => {
          localStorage.setItem(localStorageKey, JSON.stringify(state));
        }, 500);
      }
    }
  };
  const onMoveEnd = () => {
    state.onDrag = false;
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", (e) => {
    onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
  });
  window.addEventListener("mouseup", onMoveEnd);
  window.addEventListener("touchend", onMoveEnd);
  const state = {
    onDrag: false,
    x: clientX || 0,
    y: clientY || 0,
    startX: 0,
    startY: 0,
  };
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
  fixPosition(state);
  aoife.waitAppend(query).then((ele) => {
    ele.style.position = "fixed";
    update();
  });
  return (
    <div
      tat-base-drag="1"
      style={{
        cursor: "move",
        ...(style as any),
      }}
      onmousedown={(e) => {
        state.onDrag = true;
        state.startX = e.offsetX;
        state.startX = e.offsetX;
      }}
      ontouchstart={(e: any) => {
        state.onDrag = true;
        if (e.touches && e.touches[0] && e.touches[0].target) {
          state.startX = e.touches[0].target.offsetLeft;
          state.startY = e.touches[0].target.offsetHeight;
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
