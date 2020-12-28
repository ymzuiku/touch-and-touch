import Message from "vanilla-message";
import { state } from "./state";

function customEvent(e: any) {
  if (e.detail) {
    Message.info(`[TouchAndTouch] Listened: ${e.detail}`, { outTime: 1500, position:'bottom' });
    state.recordItems.insertOne({
      key: "",
      type: "customEvent",
      value: e.detail,
    });
  }
}

export const recordListenCustemEvent = () => {
  window.addEventListener("tat", customEvent);
};
export const recordRemoveCustemEvent = () => {
  window.removeEventListener("tat", customEvent);
};
