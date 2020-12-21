import { state } from "./state";

export const recordClear = () => {
  state.recording.set(0);
  state.replaying.set(0);
  state.recordItems.set([]);
  state.showList = true;
  state.showExpend = true;
  const list = aoife.next(".tat-plan");
  console.log("aaaaaaa", list);
};
