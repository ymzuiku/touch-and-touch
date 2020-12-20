interface DragProps extends IProps {
  savePositionKey?: string;
  clientX?: number;
  clientY?: number;
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
  style,
  children,
  clientX,
  clientY,
  savePositionKey,
  ...rest
}: DragProps) => {
  let saveTime: any;
  window.addEventListener("mousemove", (e) => {
    if (state.onDrag) {
      state.x = e.clientX - state.startX;
      state.y = e.clientY - state.startY;
      fixPosition(state);
      next("[tat-drag]");
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
  console.log(children);
  return (
    <div
      tat-drag="1"
      style={() => ({
        cursor: "move",
        position: "fixed",
        left: state.x + "px",
        top: state.y + "px",
        ...(style as any),
      })}
      onmousedown={(e) => {
        state.onDrag = true;
        state.startX = e.offsetX;
        state.startX = e.offsetX;
      }}
      {...rest}
    >
      {/* {children && children[0]}
      {children && children[1]}
      {children && children[2]}
      {children && children[3]}
      {children && children[4]} */}
      {children}
    </div>
  );
};
