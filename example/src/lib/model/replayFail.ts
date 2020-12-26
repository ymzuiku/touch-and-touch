import { state } from "./state";
import { replayStop } from "./replayStop";
import { initOpt } from "./init";

export const replayFail = async (msg: any) => {
  if (initOpt.onFail) {
    const cell = await state.nowCell.findOne();
    initOpt.onFail(cell, msg);
  } else {
    alert(msg);
  }
  await replayStop();
};
