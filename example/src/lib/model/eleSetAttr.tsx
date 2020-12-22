import { eleSetListen } from "./eleSetListen";

const listenTags = [
  "input",
  "a",
  "button",
  "textarea",
  "command",
  "option",
  "form",
  "video",
];

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

export const loadPageKey = () =>
  window.location.pathname + window.location.hash.split("?")[0];

function setAttrId(ele: HTMLInputElement) {
  if (ele.closest("[tat-ignore]")) {
    return;
  }
  if (ele.getAttribute("tat-key")) {
    return;
  }
  const pageKey = loadPageKey();
  const selfTid = ele.getAttribute("tat-id");
  if (selfTid) {
    ele.setAttribute("tat-key", pageKey + selfTid);
    return;
  }
  const selfId = ele.getAttribute("id");
  if (selfId) {
    ele.setAttribute("tat-mark", pageKey + selfId);
    return;
  }
  const tat = getAttrAndCloseAttr(ele, "tat-id");
  const id = getAttrAndCloseAttr(ele, "id");
  const key = getAttrAndCloseAttr(ele, "key");
  const placeholder = ele.getAttribute("placeholder");
  const name = ele.getAttribute("name");
  const type = ele.getAttribute("type");

  ele.setAttribute(
    "tat-key",
    aoife.stringToHex(
      [pageKey, ele.nodeName, placeholder, name, type, id, key, tat].join("_")
    )
  );
  eleSetListen(ele as any);
}

export function eleSetAttr(parent: HTMLElement) {
  parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId as any);
}
