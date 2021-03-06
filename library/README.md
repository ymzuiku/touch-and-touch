# touch and touch

无负担的 UI 自动化测试工具, 依赖基础标签的事件和 value 进行录制

## 安装

```sh
npm i --save touch-and-touch
```

创建实例：

```js
import TouchAndTouch from "touch-and-touch";

document.body.append(TouchAndTouch({ name: "example" }));
```

## 录制事件

以下标签，我们会监听相应的事件：

监听输入变化：

- input
- textarea
- form
- select

监听点击事件：

- a
- button
- lib
- span

除了以上元素，其他元素需要监听点击事件，需要满足以下情况之一：

<!-- - ele.getAttribute("tat-btn") no void
- ele.getAttribute("role") === "tab"
- ele.getAttribute("role") === "menuitem"
- ele.getAttribute("role") === "switch"
- ele.getAttribute("role") === "button"
- ele.getAttribute("type") === "submit"
- ele.getAttribute("type") === "button" -->

## 录制元素标志

只有具有 tat 属性的元素才会被录制

因为需要确保被录制的每个元素的唯一标识都是**唯一的**，**每次执行值为确定的**, 否则：

1. 若遇到相同的唯一标识，touch-and-touch 会默认点击第一个;
2. 若找不到上次记录的标识元素，会一直等待它出现.

touch-and-touch 在刚开始设计中，是可以自动拼接元素身上的属性进行捕获，但是这会带来一个致命缺点：在开发过程中由于元素的属性无可避免的会变化，若其中一个元素变化了，就会导致后续的录制无法被播放，从而反而影响了自动测试的复用性。

相信作者的经验，使用唯一 tat 作为录制标记，才是复用性最高的自动测试方案。

（不推荐）若对历史项目进行录制，某些页面不方便添加 tat 标记，可以勾选 `自动标记` 的开关进行录制，它会尽可能的找到多个属性进行组合作为记录的 id。

## 自动使用内容作为标记

> 注意，这种情况最好仅用于局部动态请求的数据内容，不建议在顶层使用。复用率最高的测试方案就是为每个需要交互的元素添加唯一的 tat 属性

若给一个元素添加 `tat-auto` 属性，会使用属性的值作为查找器查找子元素，并且将 textContent 设置为子元素 tat 值, 若要获取其他值作为 tat 值，可以定义 `tat-auto-detail` 属性

例子 1, 使用 `tat-auto`

```html
<!-- 原始 DOM -->
<div tat-auto=".dog">
  <button class="dog">button-a</button>
  <button>button-b</button>
</div>
<!-- 自动处理过的 DOM -->
<div tat-auto=".dog">
  <button tat="button-a" class="dog">button-a</button>
  <button>button-b</button>
  <div></div>
</div>
```

例子 2, 使用 `tat-auto` + `tat-auto-detail`

```html
<div tat-auto=".dog" tat-auto-detail="textContent, class">
  <button class="dog">button-a</button>
  <button>button-b</button>
</div>
<!-- 自动处理过的 DOM -->
<div tat-auto=".dog">
  <button tat="button-a, dog" class="dog">button-a</button>
  <button>button-b</button>
  <div></div>
</div>
```

### 忽略录制

若某个元素有：`tat-ignore` 属性，它及它的子元素的交互都不会被录制，例如我们的录制面板就是 `tat-ignore`。

## 播放录制

根据录制的事件列表，会对不同的元素进行模拟动作

- input: 根据之前记录的 type，使用之前记录的 value 触发 oninput / onchange
- textarea: 根据之前记录的 type，使用之前记录的 value 触发 oninput / onchange
- form: 播放之前记录的每次 onchange 事件
- select: 根据之前记录的 type，使用之前记录的 value 触发 onclick
- a: 根据之前记录的 type，使用之前记录的 value 触发 onclick
- button: 根据之前记录的 type，使用之前记录的 value 触发 onclick
- 其他元素: 包含 tat-btn 属性的 div，根据之前记录的 type，使用之前记录的 value 触发 onclick

## 录制时使用 mockjs.Random

在 input 过程中可以直接输入：

```js
mock.word(5, 10)!!
```

当输入值的过程， `touch-and-touch` 发现 `!!` 结尾的值时，会把 input value 作为函数进行执行，并且把返回值输入到输入框中, 当播放时，会重新执行函数，获取新的随机值进行测试

## 使用上下文变量

1. 在第一输入框的输入过程中，可以直接输入：

```js
set("a", mock.phone())!!
```

此时会获取一个随机手机号，并且存到 a 变量中，变量 a 会存储在 indexedDb 数据库中

2. 在第二个输入框获取变量 a：

```js
get("a")!!
```

此时会获取上一次的变量 a 作为值进行测试

## 主动提交记录

若某些非页面可以反馈的状态，我们希望 TouchAndTouch 进行校验，我们可以在状态达到条件时，主动在代码中使用 CustomEvent 提交记录：

```js
window.dispatchEvent(new CustomEvent("tat", { detail: "done dog" }));
```

在播放时，会检测是否有在指定行为获取到 CustomEvent，来校验测试是否失败

## 生产环境进行测试

生产环境默认不应该加载 TouchAndTouch，您可以设置一个函数，当在控制台执行之后，执行 TouchAndTouch, 例子如下：

```ts
window.tat = () => {
  sessionStorage.setItem("tat-creator");
  window.location.reload();
};
if (sessionStorage.getItem("tat-creator")) {
  import("touch-and-touch").then((tat) => {
    document.body.append(tat.default());
  });
}
```

然后在 Chrome 控制台中执行：

```js
window.tat();
```

## 云端同步

- initData: 初始化列表数据
- onChangeData: 当数据写入 indexed 变更时的回调用

```ts
TouchAndTouch({
  name:'example'
  initData:async ()=>{
    const data = fetch(...); // get list from cloud
    return data;
  },
  onChangeData:(list)=>{
    fetch(...); // push list to cloud
  }
})
```

## 锁定面板

默认 Ctrl + L 锁定面板，可以自定义 `lockCtrlKey` 修改热键
