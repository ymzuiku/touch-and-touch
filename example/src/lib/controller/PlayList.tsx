import { state } from "lib/model/state";
import css from "template-css";
import { DeleteSvg, EditorSvg } from "./svg";
import { changeInput } from "lib/model/changeInput";
import { rename } from "lib/model/rename";
import { remove } from "lib/model/remove";
import { changeSelectItem } from "lib/model/changeSelectItem";
import { changeFilter } from "lib/model/changeFilter";
import { getTitle } from "lib/model/getTitle";

export const PlayList = () => {
  return (
    <div
      class="tat-play-list"
      hidden={async () => {
        const ui = await state.ui.findOne();
        return !ui.showPlayList || !ui.showList;
      }}
    >
      <input
        class="filter"
        placeholder="Filter"
        oninput={(e) => changeFilter(e.target.value)}
      />
      <div class="cells">
        {async () => {
          const list = await state.recordList.find();
          return list.map((item, i) => {
            return (
              <div
                id={item._id}
                classPick={async () => {
                  const cell = await state.nowCell.findOne();
                  return {
                    cell: 1,
                    "cell-selected": item._id === cell._id,
                  };
                }}
                hidden={async () => {
                  const ui = await state.ui.findOne();
                  const filter = ui.filter;
                  if (!filter) {
                    return false;
                  }
                  const item = await state.recordList.index(i);
                  if (!item) {
                    return true;
                  }
                  const title = getTitle(item);
                  return title.indexOf(ui.filter) < 0;
                }}
                onclick={() => changeSelectItem(item._id)}
              >
                <input
                  class="input"
                  onclick={(e) => e.stopPropagation()}
                  hidden={async (el) => {
                    const ui = await state.ui.findOne();
                    const hidden = ui.showInputId !== item._id;
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
                  value={async () => {
                    const v = await state.recordList.index(i);
                    if (!v) {
                      return "";
                    }
                    return v.title || "";
                  }}
                  onchange={(e) => rename(item._id, e.target.value)}
                  placeholder="请输入title"
                />
                <div
                  class="label"
                  hidden={async () => {
                    const ui = await state.ui.findOne();
                    return ui.showInputId === item._id;
                  }}
                >
                  {async () => {
                    const v = await state.recordList.index(i);
                    if (v) {
                      return `[${v.step}] ` + getTitle(v);
                    }
                  }}
                </div>
                <EditorSvg
                  class="edit"
                  onclick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    changeInput(item._id);
                  }}
                />
                <DeleteSvg
                  class="edit"
                  onclick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    remove(item._id);
                  }}
                />
              </div>
            );
          });
        }}
      </div>
    </div>
  );
};

css`
  .tat-play-list {
    width: 100%;
  }
  .tat-play-list .filter {
    height: 20px;
    font-size: 12px;
    margin: 4px;
    margin-bottom: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: calc(100% - 13px);
    outline: none;
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
    width: 95px;
    outline: none;
  }
  .tat-play-list .cells {
    width: 100%;
    height: 200px;
    overflow-y: auto;
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
