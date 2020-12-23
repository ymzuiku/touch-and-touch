import aoife from "aoife";
import { state } from "./state";

export const recordStart = () => {
  state.recording.set(1);
  state.replaying.set(0);
  state.showExpend = false;
  state.showPlayList = false;
  aoife.next(".tat-plan");
  // 记录首次页面的url
  const items = state.recordItems.get();
  let isHaveHref = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === "href") {
      isHaveHref = true;
      break;
    }
  }
  if (!isHaveHref) {
    state.recordItems.add({
      key: "",
      type: "href",
      href: window.location.href,
    });
  }
};
