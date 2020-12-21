import { state } from "./state";

export const recordSave = async () => {
  state.recording.set(0);
  state.showList = true;
  state.showExpend = true;

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
