import aoife from "aoife";
import { state } from "./state";

export const recordStart = async () => {
  state.ui.set({
    recording: 1,
    replaying: 0,
    showPlayList: 0,
  });
  aoife.next(".tat-plan");
  // 记录首次页面的url
  const items = await state.recordItems.find();
  let isHaveHref = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === "href") {
      isHaveHref = true;
      break;
    }
  }
  if (!isHaveHref) {
    state.recordItems.insertOne({
      key: "",
      type: "href",
      href: window.location.href,
    });
  }
};
