import record from "./record";
import replay from "./replay";
import { renderButton } from "./renderButton";
import micoDb from "mico-db";
import { cache } from "./cache";

export default () => {
  record();
  const btn = renderButton({
    save: () => {
      micoDb.set("touch-and-touch", cache.events);
    },
    replay: async () => {
      const events = (await micoDb.get("touch-and-touch")) as any;
      replay({
        speed: 1,
        events,
      });
    },
  });
  document.body.append(btn);
};
