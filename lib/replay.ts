import { IEvent } from "./IEvent";
import "./renderMouse";
import { mouseMove, mouseClick } from "./renderMouse";
import { clicks } from "./attrs";
import { cache, IReplay } from "./cache";
import micoDb from "mico-db";

function eventClick(el: HTMLElement) {
  if (el.closest("[tat-ignore]")) {
    return;
  }

  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  el.scrollIntoView(true);
  el.dispatchEvent(event);
}

function eventType(el: HTMLInputElement, event: IEvent, eventKey: string) {
  if (el.closest("[tat-ignore]")) {
    return;
  }
  cache.lastFocus = el;
  if (el.nodeName === "INPUT" || el.nodeName === "TEXTAREA") {
    el.focus();
  }

  const inputEvent = new InputEvent(eventKey, {
    data: event.value,
    view: window,
    bubbles: true,
    cancelable: true,
  });

  el.scrollIntoView(true);
  el.value = (event && event.value) || "";
  el.dispatchEvent(inputEvent);
}

function getElementTAT(key: string): Promise<HTMLElement> {
  return new Promise((res) => {
    const getEl = () => {
      const e = document.querySelector(key);
      if (!e) {
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

const replayKey = "tat-need-replay";

const getEleCenter = (el: HTMLElement, event: IEvent) => {
  const rect = el.getBoundingClientRect();
  event.clientX = rect.left + rect.width / 2;
  event.clientY = rect.top + rect.height / 2;
};

function sleep(t: number) {
  return new Promise((res) => {
    setTimeout(res, t);
  });
}

export const replayAndReload = (options: IReplay) => {
  const { events } = options;
  const first = events[0];
  micoDb.setLocalStorage(replayKey, 1);
  // return;
  if (first && first.href) {
    if (window.location.href === first.href) {
      // window.location.href = events[0].href;
      window.location.reload();
    } else {
      window.location.href = first.href;
    }
  }
};

export const replay = async (options: IReplay) => {
  if (!micoDb.getLocalStorage(replayKey)) {
    return;
  }
  const { speed, events } = options;
  events.forEach((item, i) => {
    item.index = i;
  });

  cache.speed = speed;
  for (const item of events) {
    if (item.event === "mclick") {
      await new Promise((res) => {
        setTimeout(res, 300 * cache.speed);
      });
      mouseClick(item);
    } else if (item.key) {
      await sleep(50 * cache.speed);
      const e = await getElementTAT(item.key);
      if (clicks.indexOf(item.event) > -1) {
        getEleCenter(e, item);
        mouseClick(item);
        await sleep(300 * cache.speed);
        eventClick(e as any);
      } else {
        if (cache.lastFocus !== e) {
          getEleCenter(e, item);
          mouseMove(item);
          await sleep(200 * cache.speed);
        }
        eventType(e as any, item, item.event);
      }
    }

    if (item.index === events.length - 1) {
      const len = events.length;
      for (let i = 0; i < len; i++) {
        cache.events[i] = events[i];
      }
    }
  }
  micoDb.removeLocalStorage(replayKey);
};
