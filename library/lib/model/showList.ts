import aoife from "aoife";
import { state } from "./state";

export const showList = async () => {
  const ui = state.ui.get();
  state.ui.merge({
    showList: ui.showList ? 0 : 1,
  });
  aoife.next(".tat-update");
};
