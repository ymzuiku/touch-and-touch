import localfile from "localfile";
import { state } from "./state";

export async function importRecord() {
  const { value } = await localfile.loadFile();
  try {
    const data = JSON.parse(value);
    data.forEach((item: any) => {
      console.log(item);
      if (!item._id) {
        throw "File type error";
      }
      item._id = "_id" + Date.now() + Math.random();
      item.updateAt = Date.now();
    });
    if (confirm("Is merge file's record data?")) {
      await state.recordList.insertMany(data);
      aoife.next(".tat-plan");
    }
  } catch (err) {
    console.error(err);
    alert("[ERROR] File is not TAT");
  }
}
