# touch and touch

无负担的 UI 自动化测试工具, 依赖基础标签的事件和 value 进行录制

## 录制事件

以下标签，我们会监听相应的事件：

- input: 当 oninput \ onchange 事件触发了，会记录 value
- textarea: 当 oninput 事件触发了，会记录 value
- form: 当 onchange 事件触发了，会记录一次事件触发
- select: 当 onclick 事件触发了，会记录一次点击
- a: 当 onclick 事件触发了，会记录 value
- button: 当 onclick 事件触发了，会记录一次点击
- div: 包含 tat-btn 属性的 div， 当 onclick 事件触发了，会记录一次点击

## 录制元素标志

唯一标示的优先级别：

1. tat-id
2. id
3. tag + key + type + name + placeholder + tat-id(冒泡寻找父元素的 tat-id) + tat-btn

其中若无 tat-id, 且无 id，则会冒泡查找父元素，直到找到为止.

请确保需要被录制的每个元素的唯一标识都是**唯一的**，**每次执行值为确定的**, 否则：

1. 若遇到相同的唯一标识，touch-and-touch 会默认点击第一个;
2. 若找不到上次记录的标识元素，会一直等待它出现.

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
- div: 包含 tat-btn 属性的 div，根据之前记录的 type，使用之前记录的 value 触发 onclick

## 录制时使用 mockjs.Random

在 input 过程中可以直接输入：

```js
random.word(5, 10)!!
```

当输入值的过程， `touch-and-touch` 发现 `!!` 结尾的值时，会把 input value 作为函数进行执行，并且把返回值输入到输入框中, 当播放时，会重新执行函数，获取新的随机值进行测试

## 使用上下文变量

1. 在第一输入框的输入过程中，可以直接输入：

```js
set("a", random.phone())!!
```

此时会获取一个随机手机号，并且存到 a 变量中，变量 a 会存储在 indexedDb 数据库中

2. 在第二个输入框获取变量 a：

```js
get("a")!!
```

此时会获取上一次的变量 a 作为值进行测试

## 主动提交记录

若某些非页面可以反馈的状态，我们希望 TouchAndTouch 进行校验，我们可以在状态达到条件时，主动在代码中提交记录

```js

```

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
