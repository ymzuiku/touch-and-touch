import { state } from "./state";
import { replayStop } from "./replayStop";
import { initOpt } from "./init";
import Message from "vanilla-message";

export const replayFail = async (msg: any) => {
  if (initOpt.onFail) {
    const cell = await state.nowCell.findOne();
    initOpt.onFail(cell, msg);
  } else {
    Message.error(msg, { ok: "Ok", outTime: 999999 });
  }
  await replayStop();
};
