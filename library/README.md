# touch and touch

无负担的 UI 自动化测试工具

# 元素唯一标识

唯一标示的优先级别：

1. tat-id
2. id
3. tag + key + name + tat-id(冒泡寻找父元素的 tat-id)

其中若无 tat-id, 且无 id，则会冒泡查找父元素，直到找到为止.

请确保需要被录制的每个元素的唯一标识都是**唯一的**，**每次执行值为确定的**, 否则：

1. 若遇到相同的唯一标识，touch-and-touch 会默认点击第一个;
2. 若找不到上次记录的标识元素，会一直等待它出现.

# 忽略录制

若某个元素有：`tat-ignore` 属性，它及它的子元素的交互都不会被录制，例如我们的录制面板就是 `tat-ignore`。