import aoife from "aoife";
import { state } from "./state";

export const record = () => {
  state.recording.set(1);
  state.showList = false;
  state.showExpend = false;
  aoife.next(".tat-plan");
};
