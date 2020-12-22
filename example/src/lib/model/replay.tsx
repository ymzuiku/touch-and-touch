import { state } from "./state";

export const replay = () => {
  const cell = state.recordItems.get();
  state.replaying.set(1);
  alert(JSON.stringify(cell));
  aoife.next(".tat-ctrl");
};
