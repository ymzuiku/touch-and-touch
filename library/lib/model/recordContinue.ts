import aoife from "aoife";
import { recordListenCustemEvent } from "./recordListenCustomEvent";
import { getHref } from "./getHref";
import { state } from "./state";

export const recordContinue = async () => {
  await state.ui.updateOne(
    {},
    {
      recording: 1,
      replaying: 0,
    }
  );
  aoife.next(".tat-update");
  // 记录首次页面的url
  const items = await state.recordItems.find();
  let isHaveHref = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === "href") {
      isHaveHref = true;
      break;
    }
  }
  recordListenCustemEvent();
  if (!isHaveHref) {
    state.recordItems.insertOne({
      key: "",
      type: "href",
      href: getHref(window.location.href),
    });
  }
};
