export const Inputs = () => {
  const state = {
    button: 0,
  };
  return (
    <div class="buttons">
      <h2>inputs</h2>
      <input
        onclick={() => {
          state.button += 1;
          aoife.next(".buttons");
        }}
      />
    </div>
  );
};
