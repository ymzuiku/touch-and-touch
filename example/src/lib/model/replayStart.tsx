import { mouseClick, mouseMove } from "./replayMouse";
import { RecordItem, state } from "./state";
import { clicks } from "./eleSetListen";

export const replayStart = async () => {
  const items = await state.recordItems.find();
  // 开始设置播放的样式
  state.ui.set({
    recording: 0,
    replaying: 1,
    showMouse: 1,
    showPlayList: 0,
  });
  aoife.next(".tat-ctrl, .tat-step, .tat-mouse");

  // 播放
  await startReplay(items);

  // 还原播放的样式
  state.ui.set({
    recording: 0,
    replaying: 0,
    showMouse: 0,
    showPlayList: 1,
  });
  aoife.next(".tat-plan, .tat-mouse");
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
  state.ui.get().lastFocus = el;
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
  let t = Date.now();
  return new Promise((res) => {
    const getEl = () => {
      const e = document.querySelector(`[tat-key="${key}"]`);
      if (!e && Date.now() - t < state.ui.get().waitTimeout) {
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

function sleep(t: number) {
  return new Promise((res) => {
    setTimeout(res, t * state.ui.get().speed);
  });
}

const startReplay = async (items: RecordItem[]) => {
  let i = 0;
  for (const item of items) {
    i++;
    if (!state.ui.get().replaying) {
      break;
    }
    if (i < state.ui.get().replayStep) {
      continue;
    }
    state.ui.set({ replayStep: i });
    aoife.next(".tat-step");
    if (item.href) {
      window.location.href = item.href;
    }

    if (item.type === "mclick") {
      await sleep(80);
      mouseClick(item);
    } else if (item.key) {
      await sleep(50);
      const el = await waitGetElement(item.key);
      if (clicks.indexOf(item.type) > -1) {
        getEleCenter(el, item);
        mouseClick(item);
        await sleep(80);
        emitClick(el as any);
      } else {
        if (state.ui.get().lastFocus !== el) {
          getEleCenter(el, item);
          mouseMove(item);
          await sleep(40);
        }
        emitInput(el as any, item, item.type);
      }
    }
  }
  state.ui.set({ replayStep: 0 });
};
