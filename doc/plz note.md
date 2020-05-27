Please note that...
===
* deltamap的文件一共有三个：
    * deltamapOverall.html,
    * guans-deltamap`npm`
    * /libs/vis.js

由于在组件外部无法修改组件的状态（not yet），所以在更新datail面板的代码构建中
将其放在了vis.js文件中

由于vis.js是作为函数库引入的原因，所以暂时不可更改。

但是不要担心，这一部分代码不会更新到新的deltamap-npm版本
仅仅作为组件外部的一个函数库使用。

----------------updated line

已解决！

既然不能在组件的外部setState
那就在组件中设置hover监听函数

前提是：把d3.select()的对象当作全局变量拉进组件
然后在开始设置监听。

太完美了。
