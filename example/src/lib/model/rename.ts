import { state } from "./state";

export const rename = async (id: string, title: string) => {
  state.ui.merge({
    showInputId: "",
  });
  await state.recordList.updateOne({ _id: id }, { title });
  aoife.next("#" + id);
};
