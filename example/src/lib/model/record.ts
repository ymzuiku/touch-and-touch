import aoife from "aoife";
import { state } from "./state";

export const record = () => {
  state.recording.set(1);
  aoife.next(".tat-ctrl");
};
