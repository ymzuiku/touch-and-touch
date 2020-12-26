import { getEventVal } from "./getEventVal";
import { recordItemAdd } from "./recordItemAdd";

export const inputs = ["input", "submit"];
export const submits = ["submit", "change"];
export const clicks = ["mousedown", "touchend"];
export const attrs = [...inputs, ...clicks, ...submits];

export const eleSetListen = (ele: HTMLLIElement) => {
  let attrList = attrs;
  if (ele.nodeName === "FORM") {
    attrList = ["change"];
  }

  attrList.forEach((e: string) => {
    if ((ele as any)["tat-" + e]) {
      return;
    }
    ele.addEventListener(e, function (event: Event) {
      if (clicks.indexOf(e) > -1) {
        setTimeout(() => {
          recordItemAdd({
            key: ele.getAttribute("tat-key")!,
            type: e,
            value: getEventVal(event),
          });
        }, 20);
      } else {
        recordItemAdd({
          key: ele.getAttribute("tat-key")!,
          type: e,
          value: getEventVal(event),
        });
      }
    });
  });
};
