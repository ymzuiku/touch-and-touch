import { state } from "./state";

export const replayStop = async () => {
  state.ui.set({
    recording: 0,
    replaying: 0,
    showMouse: 0,
    replayStep: -1,
    showPlayList: 1,
  });
  console.log(state.ui.get());
  aoife.next(".tat-plan");
  aoife.next(".tat-mouse");
};
