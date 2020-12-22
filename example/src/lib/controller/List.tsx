import { replay } from "lib/model/replay";
import { state } from "lib/model/state";
import VanillaList from "vanilla-list";
import css from "template-css";
import { DeleteSvg, EditorSvg } from "./svg";
import { changeInput } from "lib/model/changeInput";
import { rename } from "lib/model/rename";
import { remove } from "lib/model/remove";
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
                    class="tat-cell-label"
                    hidden={() =>
                      state.showInputId === state.data.recordList[i].id
                    }
                    onclick={() => replay(state.data.recordList[i].id)}
                  >
                    {() =>
                      state.data.recordList[i].title ||
                      dayjs(state.data.recordList[i].updateAt).format(
                        "MM-DD HH:mm"
                      )
                    }
                  </div>
                  <EditorSvg
                    class="tat-edit"
                    onclick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      changeInput(state.data.recordList[i].id);
                    }}
                  />
                  <DeleteSvg
                    class="tat-edit"
                    onclick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      remove(state.data.recordList[i].id);
                    }}
                  />
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
    height: 160px;
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
    width: 93px;
    outline: none;
  }
  .tat-cell-label {
    width: 100px;
    ${css.wordBreak(1)}
  }
  .tat-edit:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-cell {
    height: 20px;
    font-size: 12px;
    padding: 4px 0px 4px 4px;
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
