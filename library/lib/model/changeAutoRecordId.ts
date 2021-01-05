import { state } from "./state";

export const changeAutoRecordId = async () => {
  const ui = state.ui.get();
  state.ui.merge({
    autoRecordId: !ui.autoRecordId,
  });
  aoife.next(".tat-update");
};
