export const Buttons = () => {
  const state = {
    button: 0,
  };
  return (
    <div class="buttons">
      <h2>buttons</h2>
      <p>the button: {() => state.button}</p>
      <button
        onclick={() => {
          state.button += 1;
          aoife.next(".buttons");
        }}
      >
        the button
      </button>
    </div>
  );
};
