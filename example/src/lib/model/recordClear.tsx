import { state } from "./state";

export const recordClear = () => {
  state.ui.set({
    recording: 0,
    replaying: 0,
    showList: 1,
  });
  state.recordItems.set([]);
  aoife.next(".tat-plan");
};
