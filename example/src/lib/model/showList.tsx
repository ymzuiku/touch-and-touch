import aoife from "aoife";
import { state } from "./state";

export const showList = () => {
  state.showList = !state.showList;
  aoife.next(".tat-plan");
};
