import "dom-jsx";
import { TouchAndTouchController } from "./lib";

// 这是一个普通的 jsx 组件
function App() {
  return (
    <div class="app">
      <h1>Hello World</h1>
      {/* 传递 props.name */}
      <StatefulExample name="Add Num" />
      <TouchAndTouchController />
    </div>
  );
}

// 这是一个用于演示 函数赋值/更新 的组件
function StatefulExample({ name }: { name: string }) {
  console.log(
    "这个日志仅会打印一次，因为next更新仅仅会派发元素的子属性，不会重绘整个组件"
  );
  let num = 0;
  return (
    <div>
      <button
        onclick={() => {
          num += 1;
          // next 会使用 document.body.querySelectorAll() 查询并更新 `.add` 匹配的元素及子元素
          next(".add");
        }}
      >
        {name}
      </button>
      {/* 使用【函数赋值】更新样式 */}
      <div
        class="add"
        style={() => ({
          fontSize: 20 + num + "px",
        })}
      >
        {/* 使用【函数赋值】文字 */}
        <p>{() => num}</p>
      </div>
    </div>
  );
}

document.body.append(App());
