import { RecordItem, state } from "./state";

export const recordItemAdd = async (event: RecordItem) => {
  state.recordItems.add(event);
  aoife.next(".tat-record-cell");
};
