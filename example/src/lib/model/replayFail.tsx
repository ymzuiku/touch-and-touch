import { state } from "./state";
import Message from "vanilla-message";
import { replayStop } from "./replayStop";
import { initOpt } from "./init";

export const replayFail = async (msg: any) => {
  Message(msg, { style: { background: "#f66" } });
  if (initOpt.onFail) {
    const cell = state.nowCell.get();
    initOpt.onFail(cell, msg);
  }
  await replayStop();
};
