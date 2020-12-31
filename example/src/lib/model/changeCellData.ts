import Message from "vanilla-message";
import { state } from "./state";

export const changeCellData = async (id: string, code: string) => {
  let items: any;
  try {
    items = JSON.parse(code);
    if (Object.prototype.toString.call(items) !== "[object Array]") {
      throw "items need a array";
    }
  } catch (err) {
    Message.error(err.toString(), { style: { zIndex: 16000 } });
    return false;
  }
  await state.recordList.updateOne({ _id: id }, { items });

  return true;
};
