import aoife from "aoife";
import css from "template-css";
import { changeCellData } from "../model/changeCellData";
import { findCellDate } from "../model/findCellDate";

export default ({ id }: { id: string }) => {
  const ele = aoife(
    "div",
    { id: "tat-code-plan", class: "tat-code-plan", "tat-ignore": true },
    aoife(
      "div",
      { class: "plan" },
      aoife(
        "div",
        { class: "button-plan" },
        aoife(
          "button",
          {
            onclick: async (e: any) => {
              const textarea = document.getElementById(
                "tat-code-plan-textarea"
              ) as HTMLTextAreaElement;
              const done = await changeCellData(id, textarea.value);
              console.log("bbbb", done);
              if (done) {
                ele.remove();
              }
            },
          },
          "Save"
        ),
        aoife(
          "button",
          {
            onclick: () => {
              ele.remove();
            },
          },
          "Cancel"
        )
      ),
      aoife("textarea", {
        tabindex: 0,
        dir: "ltr",
        autocapitalize: "off",
        autocomplete: "off",
        autocorrect: "off",
        id: "tat-code-plan-textarea",
        spellcheck: false,
        class: "",
        value: () => findCellDate(id),
      })
    )
  );

  return ele;
};

css`
  .tat-code-plan {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 15010;
  }
  .tat-code-plan .plan {
    ${css.flex("col-start-start")}
    height: 100%;
  }
  .tat-code-plan .button-plan {
    position: fixed;
    top: 0px;
    right: 0px;
    padding: 14px;
  }
  .tat-code-plan button {
    ${css.clear()}
    margin: 6px;
    background: #77f;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
  }
  .tat-code-plan button:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  .tat-code-plan button:active {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    background: #55f;
  }
  .tat-code-plan textarea {
    ${css.clear()};
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
    flex: 1;
    border: none;
    background: #fff;
  }
`;
