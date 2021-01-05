import { state } from "./state";

export const changeInput = async (id: string) => {
  state.ui.merge({ showInputId: id });
  aoife.next(".tat-play-list .cell");
};
