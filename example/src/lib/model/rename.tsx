import { state } from "./state";

export const rename = async (id: string, title: string) => {
  state.ui.set({
    showInputId: "",
  });
  await state.recordList.updateOne({ id }, { title });
  aoife.next("#" + id);
};
