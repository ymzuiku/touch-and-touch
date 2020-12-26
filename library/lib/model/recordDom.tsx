import { eleSetAttr } from "./eleSetAttr";
import { recordItemAdd } from "./recordItemAdd";

const matchPlanMClick: any = {
  FORM: 1,
  HTML: 1,
  DIV: 1,
};

// 记录页面点击位置
function recordMouse(event: any) {
  if (matchPlanMClick[event.target.nodeName]) {
    recordItemAdd({
      key: "",
      type: "mclick",
      clientX: event.clientX,
      clientY: event.clientY,
    });
  }
}

export function recordDom() {
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
