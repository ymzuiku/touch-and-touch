import { state } from "lib/model/state";
import css from "template-css";

export const RecordList = () => {
  return (
    <div class="tat-record-cell" hidden={() => !state.showList}>
      step: {() => state.recordItems.get().length}
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
