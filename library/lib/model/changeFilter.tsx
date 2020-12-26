import { state } from "./state";

export const changeFilter = async (filter: string) => {
  await state.ui.updateOne({}, { filter });
  aoife.next(".tat-play-list .cell");
};
