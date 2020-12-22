import { state } from "./state";

export const recordAdd = async () => {
  const items = state.recordItems.get();
  await state.recordList.add(
    {
      id: "id" + Date.now(),
      updateAt: Date.now(),
      step: items.length,
    },
    items
  );

  aoife.next(".tat-plan");
};
