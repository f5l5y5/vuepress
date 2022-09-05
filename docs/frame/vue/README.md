## scoped原理
 scope css的本质是基于HTML和CSS属性选择器，分别给HTML标签和CSS选择器添加data-v-xxx,具体通过vue-loader实现,分三步：
1. 首先vue-loader会解析.vue组件，提取template、script、style对应的代码块
2. 然后构造组件实例，在组件实例的选项上绑定scopedId
3. 最后对style的CSS代码进行编译转化，应用scopedId生成选择器的属性