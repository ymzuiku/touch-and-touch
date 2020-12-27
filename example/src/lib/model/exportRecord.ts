import dayjs from "dayjs";
import localfile from "localfile";
import { state } from "./state";

export async function exportRecord() {
  const list = await state.recordList.find();
  localfile.download(
    `TouchAndTouch_${dayjs(Date.now()).format("YYYY_MM_DD_HH_mm")}`,
    JSON.stringify(list)
  );
}
