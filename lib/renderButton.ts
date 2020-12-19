export function renderButton({
  save,
  replay,
}: {
  save: (ev: MouseEvent) => any;
  replay: (ev: MouseEvent) => any;
}) {
  const box = document.createElement("div");
  box.setAttribute("tat-ignore", "1");
  box.style.zIndex = "9901";
  box.style.position = "fixed";
  box.style.right = "0px";
  box.style.bottom = "0px";
  box.style.color = "#fff";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = save;

  const replayButton = document.createElement("button");
  replayButton.textContent = "Replay";
  replayButton.onclick = replay;

  box.append(saveButton, replayButton);

  return box;
}
