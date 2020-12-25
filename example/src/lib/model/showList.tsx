import aoife from "aoife";
import { state } from "./state";

export const showList = async () => {
  const ui = await state.ui.findOne();
  await state.ui.updateOne(
    {},
    {
      showList: ui.showList ? 0 : 1,
    }
  );
  aoife.next(".tat-plan");
};
