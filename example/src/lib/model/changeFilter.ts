import { state } from "./state";

export const changeFilter = async (filter: string) => {
  state.ui.merge({
    filter: filter
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
  });
  aoife.next(".tat-play-list .cell");
};
