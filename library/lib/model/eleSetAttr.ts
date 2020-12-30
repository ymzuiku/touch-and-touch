import { eleSetListen } from "./eleSetListen";
import { initOpt } from "./init";

const listenTags = [
  "input",
  "a",
  "button",
  "textarea",
  "select",
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

const attrKeys = {} as any;

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

  const selfId = ele.getAttribute("id");
  if (selfId) {
    ele.setAttribute("tat-key", selfId);
    return eleSetListen(ele as any);
  }

  const id = getAttrAndCloseAttr(ele, "id");
  let tatKey = [tag, id && "id:" + id].filter(Boolean).join(",");

  if (initOpt.autoUseContext && attrKeys[tatKey]) {
    tatKey += "_" + ele.textContent;
  }

  ele.setAttribute("tat-key", tatKey);
  if (initOpt.autoUseContext) {
    attrKeys[tatKey] = 1;
  }

  eleSetListen(ele as any);
}

export function eleSetAttr(parent: HTMLElement) {
  parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId as any);
}
