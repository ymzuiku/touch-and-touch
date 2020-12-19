import { IEvent } from "./IEvent";
import { cache } from "./cache";

const svg = `
<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3740"><path d="M796.377747 658.252171H584.209846l111.661948 271.985873c7.777996 18.855991-1.109999 39.997981-18.887991 47.997977l-98.329954 42.85398c-18.329991 7.999996-38.885982-1.141999-46.663978-19.427991l-106.105951-258.271878-173.327918 178.275916C229.458012 945.420037 192.00003 927.108045 192.00003 895.95406V36.598463C192.00003 3.798478 231.842011-12.191514 252.554002 10.886475l568.823733 585.083726c22.943989 22.35799 6.013997 62.281971-24.999988 62.28197z" fill="" p-id="3741"></path></svg>
`;
const setStyle = (ele: any, obj: any) => {
  Object.keys(obj).forEach((k) => {
    ele.style[k] = obj[k];
  });
};

const baseRoundTransform = "translate(-10px, -28px) ";
const mouse = document.createElement("div");

setStyle(mouse, {
  transition: `all ${0.3 * cache.speed}s cubic-bezier(0.23, 1, 0.32, 1)`,
  position: "fixed",
  pointerEvents: "none",
  left: "-50px",
  top: "-50px",
  zIndex: 9900,
});

const svgEle = document.createElement("div");
setStyle(svgEle, {
  transform: "translate(-3px, -3px)",
  filter: "drop-shadow(0px 6px 3px rgba(0,0,0,0.25))",
});
svgEle.innerHTML = svg;

const round = document.createElement("div");
setStyle(round, {
  display: "block",
  transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
  transform: baseRoundTransform,
  width: "20px",
  height: "20px",
  borderRadius: "10px",
  background: "rgba(0,100,255,0.35)",
});

mouse.append(svgEle, round);

document.body.append(mouse);

function mouseMove(event: IEvent) {
  mouse.style.left = event.clientX + "px";
  mouse.style.top = event.clientY + "px";
}

function mouseClick(event: IEvent) {
  if (
    cache.lastFocus &&
    document.contains(cache.lastFocus) &&
    cache.lastFocus.focus
  ) {
    cache.lastFocus.blur();
    cache.lastFocus = void 0;
  }

  mouse.style.top = event.clientY + "px";
  mouse.style.left = event.clientX + "px";
  setTimeout(() => {
    round.style.transform = baseRoundTransform + "scale(0.5, 0.5)";
    setTimeout(() => {
      round.style.transform = baseRoundTransform + "scale(1, 1)";
    }, 150 * cache.speed);
  }, 150 * cache.speed);
}

export { mouse, mouseClick, mouseMove };
