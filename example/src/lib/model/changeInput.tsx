import { state } from "./state";

export const changeInput = async (id: string) => {
  state.showInputId = id;
  aoife.next(".tat-cell");
};
