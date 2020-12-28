import { mouseClick, mouseMove } from "./replayMouse";
import { RecordItem, state } from "./state";
import { clicks } from "./eleSetListen";
import { replayStop } from "./replayStop";
import { replayFail } from "./replayFail";
import { initOpt } from "./init";
import { getHref } from "./getHref";
import mockjs from "mockjs";
import { cache } from "./cache";
import Message from "vanilla-message";

export const replayStart = async () => {
  const items = await state.recordItems.find();
  // 开始设置播放的样式
  await state.ui.updateOne(
    {},
    {
      recording: 0,
      replaying: 1,
    }
  );
  await state.customEvent.deleteMany({});
  await state.customEvent.insertOne({});
  aoife.next(".tat-update, .tat-mouse");

  if (initOpt.onReplay) {
    const cell = await state.nowCell.findOne();
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
  el.scrollIntoView({ block: "center", inline: "center" });
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

  el.dispatchEvent(event);
}

async function emitInput(
  el: HTMLInputElement,
  item: RecordItem,
  eventKey: string
) {
  if (el.closest("[tat-ignore]")) {
    return;
  }
  const nodeName = el.nodeName.toLocaleLowerCase();
  if (
    nodeName === "input" ||
    nodeName === "textarea" ||
    nodeName === "button"
  ) {
    await state.ui.updateOne({}, { lastFocus: el });
    el.focus();
  }

  if (item.mock) {
    const fn = new Function("random", "set", "get", "return " + item.mock);
    item.value = await Promise.resolve(fn(mockjs.Random, cache.set, cache.get));
  }

  const inputEvent = new InputEvent(eventKey, {
    data: item.value,
    view: window,
    bubbles: true,
    cancelable: true,
  });

  el.value = (item && item.value) || "";
  el.dispatchEvent(inputEvent);
}

function done(e: any) {
  Message.info(`[TouchAndTouch] Listened: ${e.detail}`, { outTime: 1500, position:'bottom' });
  state.customEvent.updateOne({}, { [e.detail]: 1 });
}
window.addEventListener("tat", done);

function waitGetCustomEvent(detail: string) {
  const t = Date.now();
  return new Promise(async (res, rej) => {
    const custom = await state.customEvent.findOne();
    const ui = await state.ui.findOne();
    const getEvent = () => {
      if (!custom[detail]) {
        if (Date.now() - t < ui.waitTimeout) {
          requestAnimationFrame(getEvent);
        } else {
          rej("[TouchAndTouch] Unlistened: " + detail);
        }
      } else {
        res(true);
      }
    };
    getEvent();
  });
}

function waitGetElement(key: string): Promise<HTMLElement> {
  const t = Date.now();
  return new Promise(async (res, rej) => {
    const getEl = async () => {
      const e = document.querySelector(`[tat-key="${key}"]`) as HTMLElement;
      const ui = await state.ui.findOne();
      if (
        !e ||
        e.hidden ||
        e.style.display === "none" ||
        e.style.visibility === "hidden"
      ) {
        if (Date.now() - t < ui.waitTimeout) {
          requestAnimationFrame(getEl);
        } else {
          rej("[TouchAndTouch Error] Find next element timeout");
        }
      } else {
        res(e as any);
      }
    };
    await getEl();
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
  return new Promise(async (res) => {
    const ui = await state.ui.findOne();
    setTimeout(res, t * ui.speed);
  });
}

const startReplay = async (items: RecordItem[]) => {
  let i = 0;
  await state.ui.updateOne(
    {},
    {
      showMouse: 1,
    }
  );
  for (const item of items) {
    const ui = await state.ui.findOne();
    i++;
    if (!ui.replaying) {
      break;
    }
    if (i < ui.step) {
      continue;
    }
    await state.ui.updateOne({}, { step: i });
    aoife.next(".tat-step");
    if (item.href) {
      if (
        item.href.indexOf("#/") > -1 &&
        getHref(window.location.href) === item.href
      ) {
        window.location.href = item.href;
        window.location.reload();
      } else {
        window.location.href = item.href;
      }
    }

    if (item.type === "mclick") {
      await sleep(120);
      mouseClick(item);
    } else if (item.type === "customEvent" && item.value) {
      await waitGetCustomEvent(item.value);
    } else if (item.key) {
      const el = await waitGetElement(item.key);
      if (el.nodeName !== "FORM" && el.nodeName !== "DIV") {
        scrollIntoView(el);
        await sleep(16);
      }
      if (clicks.indexOf(item.type) > -1) {
        if (el.nodeName !== "DIV") {
          getEleCenter(el, item);
          mouseClick(item);
          await sleep(80);
        }
        emitClick(el as any);
      } else {
        if ((await state.ui.findOne()).lastFocus !== el) {
          if (el.nodeName !== "FORM") {
            getEleCenter(el, item);
            mouseMove(item);
            await sleep(16);
          }
        }
        emitInput(el as any, item, item.type);
        await sleep(16);
      }
    }
  }
};
