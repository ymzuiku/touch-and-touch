import dayjs from "dayjs";
import { changeSelectItem } from "./changeSelectItem";
import { state } from "./state";
import MicoDb from "mico-db";

export const recordCellAdd = async () => {
  // const items = await state.recordItems.find();

  const id = MicoDb.nanoid();
  await state.recordList.insertOne({
    title: dayjs(Date.now()).format("MM/DD HH:mm"),
    _id: id,
    updateAt: Date.now(),
    step: 0,
    items: [],
  });

  await changeSelectItem(id);

  aoife.next(".tat-plan");
};
