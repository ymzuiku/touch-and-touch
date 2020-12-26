import { eleSetListen } from "./eleSetListen";

const listenTags = ["input", "a", "button", "textarea", "select", "form"];

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
  const id = getAttrAndCloseAttr(ele, "id");
  const key = getAttrAndCloseAttr(ele, "key");
  const placeholder = ele.getAttribute("placeholder");
  const name = ele.getAttribute("name");
  const type = ele.getAttribute("type");

  ele.setAttribute(
    "tat-key",
    [
      pageKey,
      "ele:" + ele.nodeName.toLowerCase(),
      "tat-id:" + tat,
      "id:" + id,
      "name:" + name,
      "type:" + type,
      "key:" + key,
      "placeholder:" + placeholder,
    ].join(", ")
  );
  eleSetListen(ele as any);
}

export function eleSetAttr(parent: HTMLElement) {
  parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId as any);
}
