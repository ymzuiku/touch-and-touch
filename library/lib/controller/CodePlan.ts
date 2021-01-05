import aoife from "aoife";
import css from "template-css";
import { changeCellData } from "../model/changeCellData";
import { changeFormat } from "../model/changeFormat";
import { findCellDate } from "../model/findCellDate";

const tabKeyDown = function (this: any, e: any) {
  if (e.keyCode == 9) {
    e.preventDefault();
    const indent = "  ";
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const sele = window.getSelection();
    if (sele) {
      let selected = window.getSelection()!.toString();
      selected = indent + selected.replace(/\n/g, "\n" + indent);
      this.value =
        this.value.substring(0, start) + selected + this.value.substring(end);
      this.setSelectionRange(start + indent.length, start + selected.length);
    }
  }
};

async function formatText() {
  const textarea = document.getElementById(
    "tat-code-plan-textarea"
  ) as HTMLTextAreaElement;
  const val = await changeFormat(textarea.value);
  if (!val) {
    return false;
  }
  textarea.value = val;
  return true;
}

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
            onclick: formatText,
          },
          "Format"
        ),
        aoife(
          "button",
          {
            onclick: async (e: any) => {
              const isRight = await formatText();
              if (!isRight) {
                return;
              }
              const textarea = document.getElementById(
                "tat-code-plan-textarea"
              ) as HTMLTextAreaElement;
              const done = await changeCellData(id, textarea.value);
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
        onkeydown: tabKeyDown,
        autocapitalize: "off",
        autocomplete: "off",
        autocorrect: "off",
        id: "tat-code-plan-textarea",
        spellcheck: false,
        class: "tat-textarea",
        value: () => findCellDate(id),
      })
    )
  );

  return ele;
};

css`
  .tat-textarea {
    font-family: Menlo, Monaco, "Courier New", monospace;
    font-size: 13px;
  }
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
    cursor: pointer;
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
