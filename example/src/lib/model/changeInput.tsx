import { state } from "./state";

export const changeInput = async (id: string) => {
  state.ui.set({ showInputId: id });
  aoife.next(".tat-play-list .cell");
};
