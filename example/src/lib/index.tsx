import { TouchAndTouchController } from "./controller";
// import { cancel } from "./model/cancel";
// import { replay } from "./model/replay";
// import { record } from "./model/record";
// import { save } from "./model/save";

// export { TouchAndTouchController, cancel, replay, record, save };
export { TouchAndTouchController };

if ((module as any).hot) {
  (module as any).hot.accept();
}
