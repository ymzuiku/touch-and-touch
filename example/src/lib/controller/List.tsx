import { replay } from "lib/model/replay";
import { state } from "lib/model/state";
import VanillaList from "vanilla-list";

export const List = () => {
  return (
    <div class="tat-list" hidden={() => !state.showList}>
      {() => {
        return (
          <VanillaList itemCount={state.data.recordList.length}>
            {(i: number) => {
              return (
                <div
                  class="tat-btn"
                  onclick={() => replay(state.data.recordList[i].id)}
                >
                  <div>
                    {state.data.recordList[i].title ||
                      state.data.recordList[i].id}
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

const css = `
  .tat-list {
    cursor:pointer;
    width: 100%;
    height: 200px;
  }
`;
document.head.append(<style>{css}</style>);
