import { cache } from "./cache";

export function renderButton({
  save,
  replay,
  stopReplay,
}: {
  // record: (ev: MouseEvent) => any;
  save: (ev: MouseEvent) => any;
  // clearRecord: (ev: MouseEvent) => any;
  replay: (ev: MouseEvent) => any;
  stopReplay: (ev: MouseEvent) => any;
}) {
  const box = document.createElement("div");
  box.setAttribute("tat-ignore", "1");
  box.style.zIndex = "9901";
  box.style.position = "fixed";
  box.style.right = "0px";
  box.style.bottom = "0px";
  box.style.color = "#fff";

  // const recordButton = document.createElement("button");
  // recordButton.textContent = "Record";
  // recordButton.onclick = record;

  const recordNum = document.createElement("button");
  recordNum.textContent = "0";
  cache.onUpdate = () => {
    recordNum.textContent = cache.events.length.toString();
  };
  const loadNum = () => {
    if (!cache.events || !cache.events.length) {
      requestAnimationFrame(loadNum);
    } else {
      cache.onUpdate!();
    }
  };
  loadNum();

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = save;

  // const clearButton = document.createElement("button");
  // clearButton.textContent = "Clear Record";
  // clearButton.onclick = clearRecord;

  const replayButton = document.createElement("button");
  replayButton.textContent = "Replay";
  replayButton.onclick = replay;

  const stopReplayButton = document.createElement("button");
  stopReplayButton.textContent = "Stop Replay";
  stopReplayButton.onclick = stopReplay;

  box.append(recordNum, saveButton, replayButton, stopReplayButton);

  return box;
}
