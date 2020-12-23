import { changeSelectItem } from "./changeSelectItem";
import { state } from "./state";

export const recordCellAdd = async () => {
  const items = await state.recordItems.find();

  const id = "id" + Date.now();
  await state.recordList.insertOne({
    id,
    updateAt: Date.now(),
    step: items.length,
    items,
  });

  await changeSelectItem(id);

  aoife.next(".tat-plan");
};
