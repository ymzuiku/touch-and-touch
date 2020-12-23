import { state } from "./state";

export const changeFilter = async (filter: string) => {
  state.ui.set({ filter });
  aoife.next(".tat-play-list .cell");
};
