import { state } from "lib/model/state";
import VanillaList from "vanilla-list";
import css from "template-css";

export const RecordList = () => {
  return (
    <div class="tat-record-list" hidden={() => !state.showList}>
      {() => {
        return (
          <VanillaList itemCount={state.data.recordItems.length}>
            {(i: number) => {
              i = state.data.recordItems.length - i - 1;
              return (
                <div class="cell">
                  <div class="label">
                    {() =>
                      state.data.recordItems[i].type +
                        "_" +
                        state.data.recordItems[i].key || ""
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
  .tat-record-list {
    cursor: pointer;
    width: 100%;
    height: 160px;
  }
  .tat-record-list .edit {
    width: 18px;
    height: 18px;
    padding: 2px 2px;
    margin-right: 2px;
    ${css.flex("row-center-center")}
  }
  .tat-record-list .input {
    height: 20px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 93px;
    outline: none;
  }
  .tat-record-list .label {
    width: 100px;
    ${css.wordBreak(1)}
  }
  .tat-record-list .edit:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-record-list .cell {
    height: 20px;
    font-size: 12px;
    padding: 4px 0px 4px 4px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    ${css.flex("row-start-center")}
  }
  .tat-record-list .cell:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-record-list .cell:active {
    background: rgba(0, 0, 128, 0.2);
  }
`;
