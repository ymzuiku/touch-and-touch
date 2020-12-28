import { state } from "./state";

export const changeFilter = async (filter: string) => {
  await state.ui.updateOne(
    {},
    {
      filter: filter
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    }
  );
  aoife.next(".tat-play-list .cell");
};
