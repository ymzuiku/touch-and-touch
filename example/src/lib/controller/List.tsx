import { replay } from "lib/model/replay";
import { state } from "lib/model/state";
import VanillaList from "vanilla-list";
import css from "template-css";
import { EditorSvg } from "./svg";
import { changeInput } from "lib/model/changeInput";
import { rename } from "lib/model/rename";
import dayjs from "dayjs";

export const List = () => {
  return (
    <div class="tat-list" hidden={() => !state.showList}>
      {() => {
        return (
          <VanillaList itemCount={state.data.recordList.length}>
            {(i: number) => {
              i = state.data.recordList.length - i - 1;
              return (
                <div class="tat-cell">
                  <EditorSvg
                    class="tat-edit"
                    onclick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      changeInput(state.data.recordList[i].id);
                    }}
                  />
                  <input
                    class="tat-input"
                    id={() => state.data.recordList[i].id}
                    hidden={(el) => {
                      const hidden =
                        state.showInputId !== state.data.recordList[i].id;
                      if (!hidden) {
                        requestAnimationFrame(() => {
                          if (document.contains(el)) {
                            el.focus();
                          }
                        });
                      }
                      return hidden;
                    }}
                    onblur={() => changeInput("")}
                    value={() => state.data.recordList[i].title || ""}
                    onchange={(e) =>
                      rename(state.data.recordList[i].id, e.target.value)
                    }
                    placeholder="请输入title"
                  />
                  <div
                    style="flex:1"
                    hidden={() =>
                      state.showInputId === state.data.recordList[i].id
                    }
                    onclick={() => replay(state.data.recordList[i].id)}
                  >
                    {() =>
                      state.data.recordList[i].title ||
                      dayjs(state.data.recordList[i].updateAt).format(
                        "YYYY-MM-DD HH:mm"
                      )
                    }
                  </div>
                </div>
              );
            }}
          </VanillaList>
        );
      }}
    </div>
  );
};

css`
  .tat-list {
    cursor: pointer;
    width: 100%;
    height: 200px;
  }
  .tat-edit {
    width: 18px;
    height: 18px;
    padding: 2px 2px;
    margin-right: 2px;
    ${css.flex("row-center-center")}
  }
  .tat-input {
    height: 20px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 100px;
    outline: none;
  }
  .tat-edit:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-cell {
    height: 20px;
    font-size: 12px;
    padding: 4px 4px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    ${css.flex("row-start-center")}
  }
  .tat-cell:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-cell:active {
    background: rgba(0, 0, 128, 0.2);
  }
`;
