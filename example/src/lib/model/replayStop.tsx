import { state } from "./state";

export const replayStop = async () => {
  state.ui.set({
    recording: 0,
    replaying: 0,
  });
  await state.recordItems.set([]);
  aoife.next(".tat-ctrl");
};
