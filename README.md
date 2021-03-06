# ripple


### 背景简介

`ripple` 定义了一块用来对用户的行为进行回馈的动画区域.我们以“属性指令”的方式进行使用，例如: `<div md-ripple [md-ripple-color]="yellow">...</div>`

默认情况下，ripple 会做出响应，当 `ripple` 的host元素接收到 mouse 或者 touch 事件, 当mousedown或者touch start事件发生后，`ripple` 进入, 当 click 事件完成后，一个圆形的前景纹波消失，并从事件的位置开始扩大直到覆盖host元素的边界。

`ripple` 同样可以用代码的方式触发，通过获取到 `ripple`的引用，并调用它的 `start` 和 `end` 方法。

### 即将到来的

Ripples 将会被加入到 `md-button`, `md-radio-button`, `md-checkbox`, and `md-nav-list` 组件中.

### API 概览

Properties:

| Name | Type | Description |
| --- | --- | --- |
| `ripple-trigger` | Element | 当被click后，触发该 ripple 的 dom, 默认是 host.
| `ripple-color` | string | 自定义的前景色
| `ripple-background-color` | string | 自定义的背景色
| `ripple-disabled` | boolean | 是否被禁用，如果设置为 true, host 将不会触发该元素。但是不影响代码中直接调用


### 用法

参照 src/container

### 效果

![alt text]( ./ripple.gif)

### todo
- 目前，只能说完成了第一个阶段的工作.
- 变量都固定的过于死了
- 要开放变量，使用户可以完成自定义