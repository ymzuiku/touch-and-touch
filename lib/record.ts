import { IEvent } from "./IEvent";
import { attrs, submits, listenTags } from "./attrs";
import { cache } from "./cache";
import { eventVal } from "./eventVal";

type OnSet = (event: IEvent) => any;

export interface TATOptions {
  tags?: string[];
  onSet?: OnSet;
}

// 计算更适合 tat 的querySelector
const getKey = (el: any) => {
  if (!el || !el.getAttribute) {
    return "";
  }
  const tatId = el.getAttribute("tat-id");
  const tag = el.nodeName ? el.nodeName.toLocaleLowerCase() : "";
  const last = `[tat-auto="${el.getAttribute("tat-auto")}"]`;

  return (
    (tatId && `[tat-id=${tatId}]`) ||
    (el.id && `#${el.id}`) ||
    (el.name && `${tag}[name="${el.name}"]`) ||
    last
  );
};

function getAttrAndCloseAttr(item: HTMLElement, key: string) {
  let attr = item.getAttribute(key);
  if (!attr) {
    const ele = item.closest(`[${key}]`);
    if (ele) {
      attr = ele.getAttribute(key);
    }
  }
  return attr || "";
}

function setId(item: HTMLInputElement, onSet: OnSet) {
  if (item.closest("[tat-ignore]")) {
    return;
  }

  if (!item.getAttribute("tat-auto")) {
    const id = getAttrAndCloseAttr(item, "id");
    const key = getAttrAndCloseAttr(item, "key");
    const tat = getAttrAndCloseAttr(item, "tat-id");
    const placeholder = item.getAttribute("placeholder");
    const name = item.getAttribute("name");
    const type = item.getAttribute("type");

    // const a = item.getAttribute('id');

    item.setAttribute(
      "tat-auto",
      [item.nodeName, placeholder, name, type, id, key, tat]
        .filter(Boolean)
        .join("_")
    );
  }

  if (item.getAttribute("tat-seted")) {
    return;
  }
  item.setAttribute("tat-seted", "1");
  let attrList = attrs;
  if (item.nodeName === "FORM") {
    attrList = [...submits];
  }
  attrList.forEach((e) => {
    if ((item as any)["tat-" + e]) {
      return;
    }
    (item as any)["tat-" + e] = true;
    if (e === "input" && item.type === "checkbox") {
      return;
    }
    item.addEventListener(e, function (...args: any[]) {
      onSet({
        key: getKey(item),
        event: e,
        value: eventVal(args[0]),
      });
    });
  });
}

function eachSetId(el: HTMLElement, onSet?: OnSet) {
  if (onSet) {
    el.querySelectorAll(listenTags.join(",")).forEach((item: any) => {
      setId(item, onSet);
    });
  }
}

const matchMclicks: any = {
  FORM: 1,
  HTML: 1,
  div: 1,
};

const record = ({ onSet, tags }: TATOptions) => {
  tags?.forEach((v) => listenTags.push(v));
  document.body.setAttribute("tat", "body");

  const lastFn = onSet;
  onSet = (event: IEvent) => {
    cache.events.push(event);
    if (lastFn) {
      lastFn(event);
    }
  };
  eachSetId(document.body, onSet);

  const callback = function (mutationsList: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        eachSetId(mutation.target, onSet);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });

  onSet({ event: "href", href: window.location.href });

  // window.addEventListener("mousemove", function (event: any) {
  //   lastMouse.clientX = event.clientX;
  //   lastMouse.clientY = event.clientY;
  // });
  // window.addEventListener("touchmove", function (event: any) {
  //   lastMouse.clientX = event.clientX;
  //   lastMouse.clientY = event.clientY;
  // });

  window.addEventListener("mousedown", function (event: any) {
    if (matchMclicks[event.target.nodeName]) {
      onSet &&
        onSet({
          event: "mclick",
          clientX: event.clientX,
          clientY: event.clientY,
        });
    }
  });

  window.addEventListener("touchend", function (event: any) {
    if (matchMclicks[event.target.nodeName]) {
      onSet &&
        onSet({
          event: "mclick",
          clientX: event.clientX,
          clientY: event.clientY,
        });
    }
  });

  // window.addEventListener("scroll", function (event: any) {
  //   fn({
  //     event: "scroll",
  //     key: getKey(event.target),
  //     scrollX: event.target.scrollX || window.scrollX,
  //     scrollY: event.target.scrollY || window.scrollY,
  //   });
  // });
};

export default record;
