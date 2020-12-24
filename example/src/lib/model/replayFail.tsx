import { state } from "./state";
import Message from "vanilla-message";
import { replayStop } from "./replayStop";

export const replayFail = async (msg: any) => {
  console.log("aa");
  Message(msg, { style: { background: "#f66" } });
  await replayStop();
};
