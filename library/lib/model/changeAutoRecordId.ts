import { state } from "./state";

export const changeAutoRecordId = async () => {
  const ui = await state.ui.findOne();
  await state.ui.updateOne(
    {},
    {
      autoRecordId: !ui.autoRecordId,
    }
  );
  aoife.next(".tat-update");
};
