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
  const pageKey = loadPageKey();
  const selfId = ele.getAttribute("id");
  if (selfId) {
    ele.setAttribute("tat-key", pageKey + selfId);
    return eleSetListen(ele as any);
  }

  const id = getAttrAndCloseAttr(ele, "id");
  const btn = ele.getAttribute("tat-btn");
  const placeholder = ele.getAttribute("placeholder");
  const name = ele.getAttribute("name");
  const role = ele.getAttribute("role");
  const type = ele.getAttribute("type");
  let tatKey = [
    pageKey,
    tag,
    id && "id:" + id,
    name && "name:" + name,
    type && "type:" + type,
    role && "role:" + role,
    placeholder && "place:" + placeholder,
    btn && "tat-btn:" + btn,
  ]
    .filter(Boolean)
    .join(",");

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
