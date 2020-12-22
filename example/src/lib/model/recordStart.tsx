import aoife from "aoife";
import { eleSetAttr } from "./eleSetAttr";
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
  startRecord();
};

const matchPlanMClick: any = {
  FORM: 1,
  HTML: 1,
  DIV: 1,
};

// 记录页面点击位置
function recordMouse(event: any) {
  if (matchPlanMClick[event.target.nodeName]) {
    state.recordItems.add({
      key: "",
      type: "mclick",
      clientX: event.clientX,
      clientY: event.clientY,
    });
  }
}

function startRecord() {
  document.body.setAttribute("tat-id", "body");
  // 初开化页面内容 recordSetAttr
  eleSetAttr(document.body);

  // 页面内容变更监听 recordSetAttr
  const onMutations = (mutationsList: any) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        eleSetAttr(mutation.target);
      }
    }
  };
  const observer = new MutationObserver(onMutations);
  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });

  // 记录鼠标点击的位置
  window.addEventListener("mousedown", recordMouse);
  window.addEventListener("touchend", recordMouse);
}
