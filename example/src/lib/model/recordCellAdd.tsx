import { state } from "./state";

export const recordCellAdd = async () => {
  const items = await state.recordItems.find();

  await state.recordList.insertOne({
    id: "id" + Date.now(),
    updateAt: Date.now(),
    step: items.length,
    items,
  });

  aoife.next(".tat-plan");
};
