import { mouseClick, mouseMove } from "./replayMouse";
import { RecordItem, state } from "./state";
import { clicks } from "./eleSetListen";
import { replayStop } from "./replayStop";
import { replayFail } from "./replayFail";
import { initOpt } from "./init";

export const replayStart = async () => {
  const items = await state.recordItems.find();
  // 开始设置播放的样式
  await state.ui.updateOne(
    {},
    {
      recording: 0,
      replaying: 1,
      showPlayList: 0,
    }
  );
  aoife.next(".tat-plan, .tat-mouse");

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

async function emitInput(
  el: HTMLInputElement,
  item: RecordItem,
  eventKey: string
) {
  if (el.closest("[tat-ignore]")) {
    return;
  }
  await state.ui.updateOne({}, { lastFocus: el });
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
  return new Promise(async (res, rej) => {
    const getEl = async () => {
      const e = document.querySelector(`[tat-key="${key}"]`);
      const ui = await state.ui.findOne();
      if (!e) {
        if (Date.now() - t < ui.waitTimeout) {
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
      window.location.href = item.href;
    }

    if (item.type === "mclick") {
      await sleep(120);
      mouseClick(item);
    } else if (item.key) {
      await sleep(50);
      const el = await waitGetElement(item.key);
      if (clicks.indexOf(item.type) > -1) {
        getEleCenter(el, item);
        mouseClick(item);
        await sleep(100);
        emitClick(el as any);
      } else {
        if ((await state.ui.findOne()).lastFocus !== el) {
          getEleCenter(el, item);
          mouseMove(item);
          await sleep(100);
        }
        emitInput(el as any, item, item.type);
        await sleep(50);
      }
    }
  }
};
