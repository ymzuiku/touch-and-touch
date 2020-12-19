import { IEvent } from "./IEvent";
import { attrs, submits } from "./attrs";
import { cache } from "./cache";
import { eventVal } from "./eventVal";

let id = 0;
let forLenId = 0;

type ISetEvent = (event: IEvent) => any;

// 计算更适合replay的querySelector
const getKey = (el: any) => {
  if (!el || !el.getAttribute) {
    return "";
  }
  const rewebId = el.getAttribute("tat-id");
  const tag = el.nodeName ? el.nodeName.toLocaleLowerCase() : "";
  const last = `[tat-auto="${el.getAttribute("tat-auto")}"]`;

  return (
    (rewebId && `[tat-id=${rewebId}]`) ||
    (el.id && `#${el.id}`) ||
    (el.name && `${tag}[name="${el.name}"]`) ||
    (el.key && `${tag}[key="${el.key}"]`) ||
    last
  );
};

function setId(item: HTMLInputElement, fn: ISetEvent) {
  if (item.closest("[tat-ignore]")) {
    return;
  }
  if (!item.getAttribute("tat-auto")) {
    let len = item.getAttribute("len");
    if (!len) {
      const lenEl = item.closest("[len]");
      if (lenEl) {
        len = lenEl.getAttribute("len");
      }
    }
    if (len || len === "0") {
      if (len === "0") {
        forLenId += 1;
      }
      item.setAttribute("tat-auto", item.nodeName + forLenId + "-" + len);
    } else {
      id += 1;
      item.setAttribute("tat-auto", id.toString());
    }
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
      fn({
        key: getKey(item),
        event: e,
        value: eventVal(args[0]),
      });
    });
  });
}

function eachSetId(el: HTMLElement, fn?: ISetEvent) {
  if (fn) {
    el.querySelectorAll(
      "input,button,a,select,textarea,command,option,form"
    ).forEach((item: any) => {
      setId(item, fn);
    });
  }
}

const matchMclicks: any = {
  FORM: 1,
  HTML: 1,
  div: 1,
};

const record = (fn?: ISetEvent) => {
  document.body.setAttribute("tat", "body");
  const lastFn = fn;
  fn = (event: IEvent) => {
    cache.events.push(event);
    if (lastFn) {
      lastFn(event);
    }
  };
  eachSetId(document.body, fn);

  const callback = function (mutationsList: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        eachSetId(mutation.target, fn);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });

  fn({ event: "href", href: window.location.href });

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
      fn &&
        fn({
          event: "mclick",
          clientX: event.clientX,
          clientY: event.clientY,
        });
    }
  });

  window.addEventListener("touchend", function (event: any) {
    if (matchMclicks[event.target.nodeName]) {
      fn &&
        fn({
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
