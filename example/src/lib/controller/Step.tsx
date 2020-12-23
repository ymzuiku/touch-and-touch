import { state } from "lib/model/state";
import css from "template-css";

export const Step = () => {
  return (
    <div class="tat-record-cell" hidden={() => !state.ui.get().showList}>
      step:{" "}
      {() =>
        state.recordItems
          .find((v: any) => v.type !== "mclick" && v.type !== "href")
          .then((list) => list.length)
      }
    </div>
  );
};

css`
  .tat-record-cell {
    padding: 4px;
    font-size: 13px;
    cursor: pointer;
    width: calc(100% - 8px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 2px;
  }
`;
