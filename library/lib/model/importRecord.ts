import localfile from "localfile";
import Message from "vanilla-message";
import { state } from "./state";

export async function importRecord() {
  const { value } = await localfile.loadFile();
  try {
    const data = JSON.parse(value);
    data.forEach((item: any) => {
      if (!item._id) {
        throw "File type error";
      }
      item._id = "_id" + Date.now() + Math.random();
      item.updateAt = Date.now();
    });
    if (
      await Message.info("Is merge record data?", {
        ok: "Ok",
        cancel: "Cancel",
      })
    ) {
      await state.recordList.insertMany(data);
      aoife.next(".tat-update");
    }
  } catch (err) {
    console.error(err);
    Message.error("[ERROR] File is not TAT");
  }
}
