import { state } from "lib/model/state";
import css from "template-css";
import { DeleteSvg, EditorSvg } from "./svg";
import { changeInput } from "lib/model/changeInput";
import { rename } from "lib/model/rename";
import { remove } from "lib/model/remove";
import dayjs from "dayjs";
import { changeSelectItem } from "lib/model/changeSelectItem";

export const PlayList = () => {
  return (
    <div
      class="tat-play-list"
      hidden={() => !state.ui.get().showPlayList || !state.ui.get().showList}
    >
      {async () => {
        const list = await state.recordList.find();
        return list.map((item, i) => {
          return (
            <div
              classPick={() => {
                return {
                  cell: 1,
                  "cell-selected": item.id === state.nowCell.get().id,
                };
              }}
              onclick={() => changeSelectItem(item.id)}
            >
              <input
                class="input"
                onclick={(e) => e.stopPropagation()}
                hidden={(el) => {
                  const hidden = state.ui.get().showInputId !== item.id;
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
                value={() =>
                  state.recordList.find().then((list) => list[i].title)
                }
                onchange={(e) =>
                  state.recordList
                    .index(i)
                    .then((item) => rename(item.id, e.target.value))
                }
                placeholder="请输入title"
              />
              <div
                class="label"
                hidden={() => state.ui.get().showInputId === item.id}
              >
                {() => item.title || dayjs(item.updateAt).format("MM-DD HH:mm")}
              </div>
              <EditorSvg
                class="edit"
                onclick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  changeInput(item.id);
                }}
              />
              <DeleteSvg
                class="edit"
                onclick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  remove(item.id);
                }}
              />
            </div>
          );
        });
      }}
    </div>
  );
};

css`
  .tat-play-list {
    cursor: pointer;
    width: 100%;
    height: 160px;
    overflow-y: auto;
  }
  .tat-play-list .edit {
    width: 18px;
    height: 18px;
    padding: 2px 2px;
    margin-right: 2px;
    ${css.flex("row-center-center")}
  }
  .tat-play-list .input {
    height: 20px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 93px;
    outline: none;
  }
  .tat-play-list .edit:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-play-list .label {
    width: 100px;
    ${css.wordBreak(1)}
  }
  .tat-play-list .cell-selected {
    border-left: 2px solid rgba(0, 0, 0, 0.5) !important;
    border-radius: 0px 2px 2px 0px !important;
  }
  .tat-play-list .cell {
    border-left: 2px solid rgba(0, 0, 0, 0);
    height: 20px;
    font-size: 12px;
    padding: 4px 0px 4px 4px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    ${css.flex("row-start-center")}
  }
  .tat-play-list .cell:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-play-list .cell:active {
    background: rgba(0, 0, 128, 0.2);
  }
`;
