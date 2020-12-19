import record, { TATOptions } from "./record";
import { replay, replayAndReload } from "./replay";
import { renderButton } from "./renderButton";
import micoDb from "mico-db";
import { cache } from "./cache";
import { keys } from "./keys";

export default (opt: TATOptions = {}) => {
  // 读取准备播放的数据
  if (opt.events) {
    micoDb.set(keys.nowData, {
      speed: opt.speed || 1,
      events: opt.events,
    });
  }
  const old = micoDb.getSessionStorage(keys.cache);
  if (old && old.events) {
    cache.events = old.events;
  }
  record(opt);

  const touchAndTouch = {
    save: () => {
      micoDb.set(keys.nowData, cache.events);
    },
    replay: async () => {
      const events = await micoDb.get(keys.nowData);
      replayAndReload({
        speed: 1,
        events,
      });
    },
    stopReplay: () => {
      if (cache.events[0]) {
        cache.events[0].href = window.location.href;
      }
      cache.events = [cache.events[0]];
      micoDb.remove(keys.nowData);
      micoDb.removeSessionStorage(keys.cache);
      micoDb.removeSessionStorage(keys.startRecord);
      micoDb.removeSessionStorage(keys.replaying);
      micoDb.removeSessionStorage(keys.replayingData);
      cache.onUpdate!();
    },
  };

  if (!opt.hiddenButtons) {
    const old = document.getElementById("tat-buttons");
    if (old) {
      old.remove();
    }
    const btn = renderButton(touchAndTouch);
    btn.id = "tat-buttons";
    document.body.append(btn);
  }

  replay();
  return touchAndTouch;
};
