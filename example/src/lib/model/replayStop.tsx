import { state } from "./state";

export const replayStop = () => {
  state.recording.set(0);
  state.replaying.set(0);
  state.recordItems.set([]);
  aoife.next(".tat-ctrl");
};
