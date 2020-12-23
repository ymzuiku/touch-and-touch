import { state } from "./state";

export const recordCellAdd = async () => {
  const items = await state.recordItems.find();
  const cell = state.nowCell.get();
  await state.recordList.updateOne(
    {
      id: cell.id,
    },
    {
      updateAt: Date.now(),
      step: items.length,
      items,
    }
  );

  aoife.next(".tat-plan");
};
