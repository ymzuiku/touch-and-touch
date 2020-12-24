import { mouseClick, mouseMove } from "./replayMouse";
import { RecordItem, state } from "./state";
import { clicks } from "./eleSetListen";
import { replayStop } from "./replayStop";
import { replayFail } from "./replayFail";
import { initOpt } from "./init";

export const replayStart = async () => {
  const items = await state.recordItems.find();
  // 开始设置播放的样式
  state.ui.set({
    recording: 0,
    replaying: 1,
    showMouse: 1,
    showPlayList: 0,
  });
  aoife.next(".tat-plan, .tat-mouse");

  if (initOpt.onReplay) {
    const cell = state.nowCell.get();
    initOpt.onReplay(cell);
  }

  // 播放
  try {
    await startReplay(items);
  } catch (err) {
    await replayFail(err);
  }

  // 还原播放的样式
  await replayStop(true);
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
  const t = Date.now();
  return new Promise((res, rej) => {
    const getEl = () => {
      const e = document.querySelector(`[tat-key="${key}"]`);
      if (!e) {
        if (Date.now() - t < state.ui.get().waitTimeout) {
          setTimeout(() => {
            getEl();
          }, 50);
        } else {
          rej("[Touch And Touch] Find next element timeout");
        }
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
    if (i < state.ui.get().step) {
      continue;
    }
    state.ui.set({ step: i });
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
};
