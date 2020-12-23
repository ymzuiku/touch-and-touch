import { mouseClick, mouseMove } from "./replayMouse";
import { RecordItem, state } from "./state";
import { clicks } from "./eleSetListen";

export const replayStart = async () => {
  const items = state.recordItems.get();
  // 开始设置播放的样式
  state.recording.set(0);
  state.replaying.set(1);
  state.showMouse = true;
  aoife.next(".tat-ctrl, .tat-mouse");

  // 播放
  await startReplay(items);

  // 还原播放的样式
  state.replaying.set(0);
  state.showMouse = false;
  aoife.next(".tat-ctrl, .tat-mouse");
};

function scrollIntoView(el: HTMLElement) {
  el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
}

function emitClick(el: HTMLElement) {
  if (el.closest("[tat-ignore]")) {
    return;
  }

  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  scrollIntoView(el);

  el.dispatchEvent(event);
}

function emitInput(el: HTMLInputElement, item: RecordItem, eventKey: string) {
  if (el.closest("[tat-ignore]")) {
    return;
  }
  state.lastFocus = el;
  const nodeName = el.nodeName.toLocaleLowerCase();
  if (nodeName === "input" || nodeName === "textarea") {
    el.focus();
  }

  const inputEvent = new InputEvent(eventKey, {
    data: item.value,
    view: window,
    bubbles: true,
    cancelable: true,
  });

  scrollIntoView(el);
  el.value = (item && item.value) || "";
  el.dispatchEvent(inputEvent);
}

function waitGetElement(key: string): Promise<HTMLElement> {
  let n = 0;
  return new Promise((res) => {
    const getEl = () => {
      const e = document.querySelector(`[tat-key="${key}"]`);
      n++;
      if (!e && n < 500) {
        setTimeout(() => {
          getEl();
        }, 50);
      } else {
        res(e as any);
      }
    };
    getEl();
  });
}

const getEleCenter = (el: HTMLElement, item: RecordItem) => {
  if (!el || !el.getBoundingClientRect) {
    return;
  }
  const rect = el.getBoundingClientRect();
  item.clientX = rect.left + rect.width / 2;
  item.clientY = rect.top + rect.height / 2;
};

function sleep() {
  return new Promise((res) => {
    setTimeout(res, 110 * state.speed.get());
  });
}

const startReplay = async (items: RecordItem[]) => {
  let i = 0;
  for (const item of items) {
    i++;
    if (!state.replaying.get()) {
      break;
    }
    if (i < state.replayStep.get()) {
      continue;
    }
    state.replayStep.set(i);
    if (item.href) {
      window.location.href = item.href;
    }

    if (item.type === "mclick") {
      await sleep();
      mouseClick(item);
    } else if (item.key) {
      await sleep();
      const el = await waitGetElement(item.key);
      if (clicks.indexOf(item.type) > -1) {
        getEleCenter(el, item);
        mouseClick(item);
        await sleep();
        emitClick(el as any);
      } else {
        if (state.lastFocus !== el) {
          getEleCenter(el, item);
          mouseMove(item);
          await sleep();
        }
        emitInput(el as any, item, item.type);
      }
    }
  }
  state.replayStep.set(0);
};
