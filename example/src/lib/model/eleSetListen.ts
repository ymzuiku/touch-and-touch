import { getEventVal } from "./getEventVal";
import { recordItemAdd } from "./recordItemAdd";
import mockjs from "mockjs";
import { cache } from "./cache";
import { initOpt } from "./init";

export const inputs = ["input"];
export const submits = ["submit", "change"];
export const clicks = ["mousedown", "touchend"];
export const attrs = [...clicks, ...submits];

export const eleSetListen = (ele: HTMLInputElement) => {
  let attrList = attrs;

  attrList.forEach((e: string) => {
    if ((ele as any)["tat-" + e]) {
      return;
    }
    (ele as any)["tat-" + e] = 1;
    ele.addEventListener(e, async function (event: Event) {
      // event.stopPropagation();
      if (
        (ele as any)._tatIgnoreOnce &&
        (ele as any)._tatIgnoreOnce === getEventVal(event)
      ) {
        return;
      }
      if (clicks.indexOf(e) > -1) {
        setTimeout(() => {
          recordItemAdd({
            id: ele.id || "",
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
            // 默认情况下忽略 input，但是用于 mock 计算
            if (initOpt.useRecordInput || e !== "input") {
              recordItemAdd({
                id: ele.id || "",
                key: ele.getAttribute("tat-key")!,
                type: "change",
                value,
                ...(mock && { mock }),
              });
            }

            const inputEvent = new InputEvent(e, {
              data: value,
              view: window,
              bubbles: true,
              cancelable: true,
            });
            (ele as any)._tatIgnoreOnce = value;
            ele.value = value;
            return ele.dispatchEvent(inputEvent);
          } catch (err) {
            console.error(err);
          }
        }
        recordItemAdd({
          id: ele.id || "",
          key: ele.getAttribute("tat-key")!,
          type: e,
          value,
          mock,
        });
      }
    });
  });
};
