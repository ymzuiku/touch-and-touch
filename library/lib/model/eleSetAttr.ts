import { eleSetListen } from "./eleSetListen";

const listenTags = [
  "input",
  "a",
  "button",
  "textarea",
  "select",
  "form",
  "div",
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
  if (ele.nodeName === "DIV" && !ele.getAttribute("tat-btn")) {
    return;
  }
  const pageKey = loadPageKey();
  const selfTatid = ele.getAttribute("tat-id");
  if (selfTatid) {
    ele.setAttribute("tat-key", pageKey + selfTatid);
    return eleSetListen(ele as any);
  }

  const selfId = ele.getAttribute("id");
  if (selfId) {
    ele.setAttribute("tat-key", pageKey + selfId);
    return eleSetListen(ele as any);
  }

  const tat = getAttrAndCloseAttr(ele, "tat-id");
  const btn = getAttrAndCloseAttr(ele, "tat-btn");
  const id = getAttrAndCloseAttr(ele, "id");
  const key = getAttrAndCloseAttr(ele, "key");
  const placeholder = ele.getAttribute("placeholder");
  const name = ele.getAttribute("name");
  const type = ele.getAttribute("type");

  ele.setAttribute(
    "tat-key",
    [
      pageKey,
      ele.nodeName.toLowerCase(),
      tat && "tat-id:" + tat,
      btn && "tat-btn:" + btn,
      id && "id:" + id,
      name && "name:" + name,
      type && "type:" + type,
      key && "key:" + key,
      placeholder && "ph:" + placeholder,
    ].join(", ")
  );
  eleSetListen(ele as any);
}

export function eleSetAttr(parent: HTMLElement) {
  parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId as any);
}
