import { getEventVal } from "./getEventVal";
import { state } from "./state";

export const inputs = ["input", "submit"];
export const submits = ["submit", "onchange"];
export const clicks = ["mousedown", "touchend"];
export const attrs = [...inputs, ...clicks, ...submits];

export const eleSetListen = (ele: HTMLLIElement) => {
  let attrList = attrs;
  if (ele.nodeName === "FORM") {
    attrList = [...submits];
  }

  attrList.forEach((e: string) => {
    if ((ele as any)["tat-" + e]) {
      return;
    }
    (ele as any)["tat-" + e] = true;
    ele.addEventListener(e, function (event: any) {
      // 播放和录制过程，不再重新记录
      if (state.replaying.get()) {
        return;
      }
      if (state.recording.get()) {
        state.recordItems.add({
          key: ele.getAttribute("tat-key")!,
          type: e,
          value: getEventVal(event),
        });
      }
    });
  });
};
