import { eleSetListen } from "./eleSetListen";

const listenTags = [
  "input",
  "a",
  "button",
  "textarea",
  "select",
  "form",
  "li",
  "span",
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
  const tag = ele.nodeName.toLocaleLowerCase();

  if (
    tag === "div" &&
    !ele.getAttribute("tat-btn") &&
    ele.getAttribute("role") !== "tab" &&
    ele.getAttribute("role") !== "menuitem" &&
    ele.getAttribute("role") !== "switch" &&
    ele.getAttribute("role") !== "button" &&
    ele.getAttribute("type") !== "submit" &&
    ele.getAttribute("type") !== "button"
  ) {
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
  const role = ele.getAttribute("role");
  const type = ele.getAttribute("type");

  ele.setAttribute(
    "tat-key",
    [
      pageKey,
      tag,
      tat && "tat-id:" + tat,
      btn && "tat-btn:" + btn,
      id && "id:" + id,
      name && "name:" + name,
      type && "type:" + type,
      key && "key:" + key,
      role && "role:" + role,
      placeholder && "place:" + placeholder,
    ]
      .filter(Boolean)
      .join(",")
  );
  eleSetListen(ele as any);
}

export function eleSetAttr(parent: HTMLElement) {
  parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId as any);
}
