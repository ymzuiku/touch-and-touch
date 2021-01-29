import { getEventVal } from "./getEventVal";
import { recordItemAdd } from "./recordItemAdd";
import mockjs from "mockjs";
import { cache } from "./cache";
import { initOpt } from "./init";
import { state } from "./state";
import { device } from "../controller/device";

export const inputs = ["input"];
export const submits = ["submit", "change"];
export const clicks = ["mousedown", "touchend"];
export const attrs = [...inputs, ...clicks, ...submits];

export const eleSetListen = (ele: HTMLInputElement) => {
  // const attrList = attrs;
  attrs.forEach((e: string) => {
    if (device().pc && e === "touchend") {
      return;
    }
    if (device().phone && e === "mousedown") {
      return;
    }
    if ((ele as any)["tat-" + e]) {
      return;
    }
    (ele as any)["tat-" + e] = 1;
    ele.addEventListener(e, async function (event: Event) {
      const ui = state.ui.get();
      if (ui.replaying) {
        return;
      }
      // event.stopPropagation();
      if (
        (ele as any)._tatIgnoreOnce &&
        (ele as any)._tatIgnoreOnce === getEventVal(event)
      ) {
        return;
      }
      if (clicks.indexOf(e) > -1) {
        setTimeout(() => {
          const key = ele.getAttribute("tat");
          if (key) {
            recordItemAdd({
              key,
              type: e,
              value: getEventVal(event),
            });
          }
        }, 20);
      } else {
        let value = getEventVal(event) as string;
        let mock = "";
        const reg = /!!$/;
        if (reg.test(value)) {
          const baseValue = value;
          mock = value.replace(reg, "");
          try {
            const fn = new Function("mock", "set", "get", "return " + mock);
            value = await Promise.resolve(
              fn(mockjs.Random, cache.set, cache.get)
            );

            const key = ele.getAttribute("tat");
            if (key) {
              recordItemAdd({
                key,
                type: "change",
                value: baseValue,
              });
            }

            const inputEvent = new InputEvent("change", {
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

        // 若 无useRecordInput，忽略 input 事件
        if (initOpt.useRecordInput || e !== "input") {
          const key = ele.getAttribute("tat");
          if (key) {
            recordItemAdd({
              key,
              type: e,
              value,
            });
          }
        }
      }
    });
  });
};
