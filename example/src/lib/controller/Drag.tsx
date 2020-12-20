interface DragProps extends IProps {
  savePositionKey?: string;
  clientX?: number;
  clientY?: number;
  query?: string;
}

function fixPosition(state: { x: number; y: number }) {
  const out = 30;
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
  savePositionKey,
  ...rest
}: DragProps) => {
  let saveTime: any;
  const update = () => {
    const Ele = document.querySelector(query) as HTMLElement;
    if (Ele) {
      Ele.style.position = "fixed";
      Ele.style.cursor = "move";
      Ele.style.left = state.x + "px";
      Ele.style.top = state.y + "px";
    }
  };
  window.addEventListener("mousemove", (e) => {
    if (state.onDrag) {
      state.x = e.clientX - state.startX;
      state.y = e.clientY - state.startY;
      fixPosition(state);
      // next("[tat-drag]");
      update();
      if (savePositionKey) {
        if (saveTime) {
          clearTimeout(saveTime);
          saveTime = null;
        }
        saveTime = setTimeout(() => {
          localStorage.setItem(savePositionKey, JSON.stringify(state));
        }, 500);
      }
    }
  });
  window.addEventListener("mouseup", (e) => {
    state.onDrag = false;
  });
  const state = {
    onDrag: false,
    x: clientX || 0,
    y: clientY || 0,
    startX: 0,
    startY: 0,
  };
  if (savePositionKey) {
    const old = localStorage.getItem(savePositionKey);
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
  dom.waitAppend(query).then(update);
  return (
    <div
      tat-base-drag="1"
      onmousedown={(e) => {
        state.onDrag = true;
        state.startX = e.offsetX;
        state.startX = e.offsetX;
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
