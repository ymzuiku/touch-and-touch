# touch and touch

无负担的 UI 自动化测试工具, 依赖基础标签的事件和 value 进行录制

## 录制元素标志

唯一标示的优先级别：

1. tat-id
2. id
3. tag + key + type + name + tat-id(冒泡寻找父元素的 tat-id)

其中若无 tat-id, 且无 id，则会冒泡查找父元素，直到找到为止.

请确保需要被录制的每个元素的唯一标识都是**唯一的**，**每次执行值为确定的**, 否则：

1. 若遇到相同的唯一标识，touch-and-touch 会默认点击第一个;
2. 若找不到上次记录的标识元素，会一直等待它出现.

### 忽略录制

若某个元素有：`tat-ignore` 属性，它及它的子元素的交互都不会被录制，例如我们的录制面板就是 `tat-ignore`。

## 录制事件

以下标签，我们会监听相应的事件：

- input: 当 oninput \ onchange 事件触发了，会记录 value
- textarea: 当 oninput 事件触发了，会记录 value
- form: 当 onchange 事件触发了，会记录一次事件触发
- select: 当 onclick 事件触发了，会记录一次点击
- a: 当 onclick 事件触发了，会记录 value
- button: 当 onclick 事件触发了，会记录一次点击
- div: 包含 tat-btn 属性的 div， 当 onclick 事件触发了，会记录一次点击

## 播放录制

根据录制的事件列表，会对不同的元素进行模拟动作

- input: 根据之前记录的 type，使用之前记录的 value 触发 oninput / onchange
- textarea: 根据之前记录的 type，使用之前记录的 value 触发 oninput / onchange
- form: 播放之前记录的每次 onchange 事件
- select: 根据之前记录的 type，使用之前记录的 value 触发 onclick
- a: 根据之前记录的 type，使用之前记录的 value 触发 onclick
- button: 根据之前记录的 type，使用之前记录的 value 触发 onclick
- div: 包含 tat-btn 属性的 div，根据之前记录的 type，使用之前记录的 value 触发 onclick
