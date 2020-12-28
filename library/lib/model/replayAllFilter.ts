import { fixFilterCell } from "./fixFilterCell";
import { replayStart } from "./replayStart";
import { RecordCell, RecordItem, state } from "./state";

export const replayAllFilter = async () => {
  const list = await state.recordList.find();
  let items = [] as RecordItem[];
  for (const cell of list) {
    const isPlay = await fixFilterCell(cell);
    if (isPlay) {
      console.log("111");
      items = items.concat(...cell.items);
    }
  }
  await state.ui.updateOne({}, { replayingAll: 1 });
  replayStart(items);
};
