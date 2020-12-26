import { getEventVal } from "./getEventVal";
import { recordItemAdd } from "./recordItemAdd";

export const inputs = ["input", "submit"];
export const submits = ["submit", "onchange"];
export const clicks = ["mousedown", "touchend"];
export const attrs = [...inputs, ...clicks, ...submits];

export const eleSetListen = (ele: HTMLLIElement) => {
  // let attrList = attrs;
  // if (ele.nodeName === "FORM") {
  //   attrList = [...submits];
  // }

  attrs.forEach((e: string) => {
    if ((ele as any)["tat-" + e]) {
      return;
    }
    ele.addEventListener(e, function (event: any) {
      recordItemAdd({
        key: ele.getAttribute("tat-key")!,
        type: e,
        value: getEventVal(event),
      });
    });
  });
};
