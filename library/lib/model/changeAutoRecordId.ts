import { state } from "./state";

export const changeAutoRecordId = async () => {
  const ui = state.ui();
  state.ui({
    autoRecordId: !ui.autoRecordId,
  });
  aoife.next(".tat-update");
};
