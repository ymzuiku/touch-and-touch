import record, { TATOptions } from "./record";
import { replay, replayAndReload } from "./replay";
import { renderButton } from "./renderButton";
import micoDb from "mico-db";
import { cache } from "./cache";

export default (opt: TATOptions = {}) => {
  record(opt);
  const btn = renderButton({
    save: () => {
      micoDb.set("touch-and-touch", cache.events);
    },
    replay: async () => {
      const events = (await micoDb.get("touch-and-touch")) as any;
      replayAndReload({
        speed: 1,
        events,
      });
    },
  });
  replay();

  document.body.append(btn);
};
