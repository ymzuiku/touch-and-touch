import { getEventVal } from "./getEventVal";
import { recordItemAdd } from "./recordItemAdd";
import mockjs from "mockjs";
import { cache } from "./cache";

export const inputs = ["input", "submit"];
export const submits = ["submit", "change"];
export const clicks = ["mousedown", "touchend"];
export const attrs = [...inputs, ...clicks, ...submits];

export const eleSetListen = (ele: HTMLInputElement) => {
  let attrList = attrs;
  if (ele.nodeName === "FORM") {
    attrList = ["change"];
  }

  attrList.forEach((e: string) => {
    if ((ele as any)["tat-" + e]) {
      return;
    }
    ele.addEventListener(e, async function (event: Event) {
      if ((ele as any)._tatIgnoreOnce === getEventVal(event)) {
        return;
      }
      if (clicks.indexOf(e) > -1) {
        setTimeout(() => {
          recordItemAdd({
            key: ele.getAttribute("tat-key")!,
            type: e,
            value: getEventVal(event),
          });
        }, 20);
      } else {
        let value = getEventVal(event) as string;
        let mock = "";
        const reg = /!!/;
        if (reg.test(value)) {
          mock = value.replace(reg, "");
          try {
            const fn = new Function("random", "set", "get", "return " + mock);
            value = await Promise.resolve(
              fn(mockjs.Random, cache.set, cache.get)
            );
            const inputEvent = new InputEvent(e, {
              data: value,
              view: window,
              bubbles: true,
              cancelable: true,
            });
            (ele as any)._tatIgnoreOnce = value;
            ele.value = value;
            ele.dispatchEvent(inputEvent);
          } catch (err) {
            console.error(err);
          }
        }
        recordItemAdd({
          key: ele.getAttribute("tat-key")!,
          type: e,
          value,
          mock,
        });
      }
    });
  });
};
