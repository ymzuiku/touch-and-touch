import { state } from "../model/state";
import css from "template-css";
import { CodeSvg, CopySvg, DeleteSvg, EditorSvg, ThinMoreSvg } from "./svg";
import { changeInput } from "../model/changeInput";
import { rename } from "../model/rename";
import { remove } from "../model/remove";
import { changeSelectItem } from "../model/changeSelectItem";
import { changeFilter } from "../model/changeFilter";
import { getTitle } from "../model/getTitle";
import { recordCellCopy } from "../model/recordCellCopy";
import { fixFilterCell } from "../model/fixFilterCell";
import Pop from "vanilla-pop";
import CodePlan from "./CodePlan";

export const PlayList = () => {
  return aoife(
    "div",
    {
      class: "tat-update, tat-play-list",
      hidden: () => {
        const ui = state.ui.get();
        return !ui.showList || ui.recording || ui.replaying;
      },
    },
    aoife("input", {
      class: "filter",
      placeholder: "FilterA, FilterB...",
      defaultValue: () => {
        const ui = state.ui.get();
        if (!ui.filter) {
          return "";
        }
        return ui.filter.join(", ");
      },
      oninput: (e) => changeFilter(e.target.value),
    }),
    aoife("div", { class: "cells" }, async () => {
      const list = await state.recordList.find();
      return list.map((item, i) => {
        return aoife(
          "div",
          {
            id: item._id,
            classPick: async () => {
              const id = state.ui().nowCellId;
              return {
                cell: 1,
                "cell-selected": item._id === id,
              };
            },
            hidden: async () => {
              const cell = await state.recordList.index(i);
              const show = await fixFilterCell(cell);
              return !show;
            },
            onclick: () => changeSelectItem(item._id),
          },
          aoife("input", {
            class: "input",
            onclick: (e) => e.stopPropagation(),
            hidden: async (el) => {
              const ui = state.ui.get();
              const hidden = ui.showInputId !== item._id;
              if (!hidden) {
                requestAnimationFrame(() => {
                  if (document.contains(el)) {
                    el.focus();
                  }
                });
              }
              return hidden;
            },
            onblur: () => changeInput(""),
            value: async () => {
              const v = await state.recordList.index(i);
              if (!v) {
                return "";
              }
              return v.title || "";
            },
            onchange: (e) => rename(item._id, e.target.value),
            placeholder: "请输入title",
          }),
          aoife(
            "div",
            {
              class: "label",
              ondblclick: () => {
                changeInput(item._id);
              },
              hidden: () => {
                const ui = state.ui.get();
                return ui.showInputId === item._id;
              },
            },
            async () => {
              const v = await state.recordList.index(i);
              if (v) {
                return `[${v.step}] ` + getTitle(v);
              }
            }
          ),
          Pop({
            placement: "right",
            zIndex: 15100,
            children: [
              ThinMoreSvg({ class: "edit" }),
              aoife(
                "div",
                { class: "tat-row" },
                EditorSvg({
                  class: "tat-btn edit",
                  onclick: (e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    changeInput(item._id);
                  },
                }),
                CodeSvg({
                  class: "tat-btn edit",
                  onclick: (e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    document.body.append(CodePlan({ id: item._id }));
                    // changeCellData(item._id);
                  },
                }),
                CopySvg({
                  class: "tat-btn edit",
                  onclick: (e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    recordCellCopy(item._id);
                  },
                }),
                DeleteSvg({
                  class: "tat-btn edit",
                  onclick: (e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    remove(item._id);
                  },
                })
              ),
            ],
          })
        );
      });
    })
  );
};

css`
  .tat-play-list {
    font-size: 14px;
    width: 100%;
  }
  .tat-play-list .filter {
    height: 20px;
    font-size: 12px;
    margin: 4px;
    margin-bottom: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: calc(100% - 8px);
    outline: none;
  }
  .tat-play-list .edit {
    width: 18px;
    height: 18px;
    padding: 2px 2px;
    margin-right: 2px;
    font-size: 12px;
    ${css.flex("row-center-center")}
  }
  .tat-play-list .input {
    height: 20px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    flex: 1;
    outline: none;
  }
  .tat-play-list .cells {
    width: 100%;
    height: 80px;
    overflow-y: auto;
  }
  .tat-play-list .edit:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-play-list .label {
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0);
    flex: 1;
    ${css.wordBreak(1)}
  }
  .tat-play-list .cell {
    border-left: 1px solid rgba(0, 0, 0, 0);
    height: 20px;
    font-size: 12px;
    padding: 4px 0px 4px 4px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    ${css.flex("row-start-center")}
  }
  .tat-play-list .cell-selected {
    /* border-left: 1px solid rgba(0, 0, 0, 0.5) !important; */
    border-radius: 0px 2px 2px 0px !important;
    background: rgba(0, 0, 0, 0.08) !important;
  }
  .tat-play-list .cell:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  .tat-play-list .cell:active {
    opacity: 0.7;
  }
`;
