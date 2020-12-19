import { attrs, listenTags, submits } from "./attrs";
import { eventVal } from "./eventVal";
import { IEvent } from "./IEvent";
import { stringToHex } from "./stringToHex";

export type RecordOnce = (event: IEvent) => any;

// 计算更适合 tat 的querySelector
export const getTATKey = (el: any) => {
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

export function getAttrAndCloseAttr(item: HTMLElement, key: string) {
  let attr = item.getAttribute(key);
  if (!attr) {
    const ele = item.closest(`[${key}]`);
    if (ele) {
      attr = ele.getAttribute(key);
    }
  }
  return attr || "";
}

export const loadPageKey = () =>
  window.location.pathname + window.location.hash.split("?")[0];

export function setTATAutoId(item: HTMLInputElement, recordOnce: RecordOnce) {
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
    const pageKey = loadPageKey();

    item.setAttribute(
      "tat-auto",
      stringToHex(
        [pageKey, item.nodeName, placeholder, name, type, id, key, tat]
          .filter(Boolean)
          .join("0")
      )
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
      recordOnce({
        key: getTATKey(item),
        event: e,
        value: eventVal(args[0]),
      });
    });
  });
}

export function querySetTATId(el: HTMLElement, recordOnce?: RecordOnce) {
  if (recordOnce) {
    el.querySelectorAll(listenTags.join(",")).forEach((item: any) => {
      setTATAutoId(item, recordOnce);
    });
  }
}
