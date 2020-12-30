import dayjs from "dayjs";
import { changeSelectItem } from "./changeSelectItem";
import { state } from "./state";

export const recordCellCopy = async (id: string) => {
  const cell = await state.recordList.findOne({ _id: id });
  const nextId = "id" + Date.now();
  await state.recordList.insertOne({
    ...cell,
    title: dayjs(Date.now()).format("MM/DD HH:mm"),
    _id: nextId,
    updateAt: cell.updateAt + 1,
  });

  await changeSelectItem(nextId);

  aoife.next(".tat-update");
};
