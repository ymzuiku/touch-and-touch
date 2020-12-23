import { mouseClick, mouseMove } from "./replayMouse";
import { RecordItem, state } from "./state";
import { clicks } from "./eleSetListen";

export const replayStart = async () => {
  const items = state.recordItems.get();
  state.replaying.set(1);
  aoife.next(".tat-ctrl");
  await startReplay(items);
  state.replaying.set(0);
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

function sleep(t: number) {
  return new Promise((res) => {
    setTimeout(res, t);
  });
}

const startReplay = async (items: RecordItem[]) => {
  items.forEach((item, i) => {
    item.index = i;
  });

  for (const item of items) {
    if (!state.replaying.get()) {
      break;
    }

    console.log(item);
    if (item.type === "mclick") {
      await sleep(50 * state.speed.get());
      mouseClick(item);
    } else if (item.key) {
      await sleep(50 * state.speed.get());
      const el = await waitGetElement(item.key);
      if (clicks.indexOf(item.type) > -1) {
        getEleCenter(el, item);
        mouseClick(item);
        await sleep(300 * state.speed.get());
        emitClick(el as any);
      } else {
        if (state.lastFocus !== el) {
          getEleCenter(el, item);
          mouseMove(item);
          await sleep(200 * state.speed.get());
        }
        emitInput(el as any, item, item.type);
      }
    }
  }
};
