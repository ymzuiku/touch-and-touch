import dayjs from "dayjs";
import { changeSelectItem } from "./changeSelectItem";
import { state } from "./state";

export const recordCellAdd = async () => {
  const items = await state.recordItems.find();

  const id = "id" + Date.now();
  await state.recordList.insertOne({
    title: dayjs(Date.now()).format("MM/DD HH:mm"),
    _id: id,
    updateAt: Date.now(),
    step: items.length,
    items,
  });

  await changeSelectItem(id);

  aoife.next(".tat-plan, .tat-step");
};
