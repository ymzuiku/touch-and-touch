import { state } from "./state";

export const rename = async (id: string, title: string) => {
  state.ui.merge({
    showInputId: "",
  });
  const now = await state.nowCell.findOne();
  if (now._id === id) {
    await state.nowCell.updateOne({}, { title });
  }
  await state.recordList.updateOne({ _id: id }, { title });
  aoife.next("#" + id);
};
