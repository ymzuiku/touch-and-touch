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

let num = 0;

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

  const tag = ele.nodeName.toLocaleLowerCase();

  if (initOpt.useAutoId) {
    const id = getAttrAndCloseAttr(ele, "id");
    const tid = getAttrAndCloseAttr(ele, "tat-id");
    const name = ele.getAttribute("name");
    const tatBtn = ele.getAttribute("tat-btn");
    const cn = ele.getAttribute("class");
    const role = ele.getAttribute("role");
    const type = ele.getAttribute("type");
    const key = ele.getAttribute("key");
    const alt = ele.getAttribute("alt");
    const src = ele.getAttribute("src");
    const placeholder = ele.getAttribute("placeholder");

    let tatKey = [
      tag,
      id && "id:" + id,
      tid && "tat-id:" + tid,
      tatBtn && "tat-btn:" + tatBtn,
      name && "name:" + name,
      cn && "class:" + cn,
      role && "role:" + role,
      type && "type:" + type,
      key && "key:" + key,
      alt && "alt:" + alt,
      src && "src:" + src,
      placeholder && "placeholder:" + placeholder,
    ]
      .filter(Boolean)
      .join(",");

    if (attrKeys[tatKey]) {
      tatKey += "_" + ele.textContent;
    }

    if (attrKeys[tatKey]) {
      num += 1;
      tatKey += "_" + num;
    }

    attrKeys[tatKey] = 1;
    ele.setAttribute("tat", tatKey);
  }

  eleSetListen(ele as any);
}

export function eleSetAttr(parent: HTMLElement) {
  parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId as any);
}
