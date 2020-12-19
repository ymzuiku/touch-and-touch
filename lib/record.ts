import { IEvent } from "./IEvent";
import { listenTags } from "./attrs";
import { cache } from "./cache";
import { RecordOnce, querySetTATId } from "./recordHelps";
import micoDb from "mico-db";
import { keys } from "./keys";

export interface TATOptions {
  hiddenButtons?: boolean;
  tags?: string[];
  recordOnce?: RecordOnce;
  events?: any;
  speed?: number;
}

const matchMclicks: any = {
  FORM: 1,
  HTML: 1,
  div: 1,
};

const record = ({ recordOnce, tags }: TATOptions) => {
  tags?.forEach((v) => listenTags.push(v));

  document.body.setAttribute(keys.id, "body");

  const lastFn = recordOnce;
  // 录制数据
  recordOnce = (event: IEvent) => {
    if (
      event.event === "href" &&
      cache.events[0] &&
      cache.events[0].event === "href"
    ) {
      return;
    }
    if (event.event !== "href" && micoDb.getSessionStorage(keys.replaying)) {
      return;
    }
    cache.events.push(event);
    cache.onUpdate!();
    micoDb.setSessionStorage(keys.cache, cache);
    if (lastFn) {
      lastFn(event);
    }
  };
  querySetTATId(document.body, recordOnce);

  const callback = function (mutationsList: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        querySetTATId(mutation.target, recordOnce);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });

  recordOnce({ event: "href", href: window.location.href });
  window.addEventListener("mousedown", function (event: any) {
    if (matchMclicks[event.target.nodeName]) {
      recordOnce!({
        event: "mclick",
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }
  });

  window.addEventListener("touchend", function (event: any) {
    if (matchMclicks[event.target.nodeName]) {
      recordOnce!({
        event: "mclick",
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }
  });
};

export default record;
