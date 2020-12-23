import aoife from "aoife";
import { state } from "./state";

export const showList = () => {
  state.ui.set({
    showList: state.ui.get().showList ? 0 : 1,
  });
  aoife.next(".tat-plan");
};
