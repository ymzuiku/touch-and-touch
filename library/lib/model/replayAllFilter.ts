import { fixFilterCell } from "./fixFilterCell";
import { replayStart } from "./replayStart";
import { RecordItem, state } from "./state";

export const replayAllFilter = async () => {
  const list = await state.recordList.find();
  let items = [] as RecordItem[];
  for (const cell of list) {
    const isPlay = await fixFilterCell(cell);
    if (isPlay) {
      items = items.concat(...cell.items);
    }
  }
  state.ui.merge({ replayingAll: 1 });
  replayStart(items);
};
