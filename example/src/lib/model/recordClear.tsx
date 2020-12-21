import { state } from "./state";

export const recordClear = () => {
  state.recording.set(0);
  state.replaying.set(0);
  state.recordItems.set([]);
  state.showList = true;
  state.showExpend = true;
  aoife.next(".tat-plan");
};
