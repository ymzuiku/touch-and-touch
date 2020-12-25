import { state } from "./state";

export const changeInput = async (id: string) => {
  await state.ui.updateOne({}, { showInputId: id });
  aoife.next(".tat-play-list .cell");
};
