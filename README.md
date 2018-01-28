公司某项目中使用ruquired.js进行javascript模块化管理，写一个例子，整理下笔记。
## Javascript模块化

Javascript模块化三种写法 [http://www.ruanyifeng.com/blog/2012/10/javascript_module.html](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

## AMD规范

1、 定义模块

采用特定的define()函数来定义

2、 加载模块

采用require()语句加载模块require([module], callback);

第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。例如：
```
　　require(['math'], function (math) {

　　　　math.add(2, 3);

　　});
```
math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

require.js实现了AMD规范。

## require.js例子

我的Github地址：https://github.com/oldmaimai/requirejsdemo

### 定义模块A，moduleA.js
```
/*
function fun1(){
  alert("it works");
}

fun1();
*/

/*
示例1：使用普通方式创建模块：使用了块作用域来申明function防止污染全局变量
*/
/*
(function(){
　　var add = function (x,y){
　　　　return x+y;
　　};
　　return {
　　　　add: add
　　};
})()
*/

define(function (){
　　var add = function (x,y){
　　　　return x+y;
　　};
　　return {
　　　　add: add
　　};
});
```

### 定义模块B，moduleB.js
```
/*
实例2：使用AMD规范创建模块：define方式来创建模块,同时，该模块还依赖moduleA
*/
define(['moduleA'], function(moduleA){
　　function add(x, y){
        return moduleA.add(x, y);
　　}
　　return {
     add : add
　　};
});
```

### 模块使用方式1：

直接引用require.js，用require的方式加载
```

<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="require.js"></script>
        <script type="text/javascript">
		    // 本地加载方式1
            require(["moduleA"]);
			
			// 本地加载方式2
			require(["moduleB"],function(mb){
			    alert(mb.add(1, 1));
			})
        </script>
    </head>
    <body>
      <span>body</span>
    </body>
</html>
```

### 模块使用方式2

异步加载requires.js，使用主模块方式，我们项目中使用这种

首先定义主模块main.js
```
//主模块依赖jquery、moduleB这2个模块
alert("主模块加载成功!");
require(['jquery-1.10.2', 'moduleB'], function ($, b){
　　　　// some code here
		alert(b.add(2, 2));
　　});

```
html使用main
```
<!DOCTYPE html>
<html>
    <head>
	    <!--
		1.async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。	
        2.data-main属性的作用是，指定网页程序的主模块。这个文件会第一个被require.js加载。
		  由于require.js默认的文件后缀名是js，所以可以把main.js简写成main
		-->
        <script src="require.js" defer async="true" data-main="main"></script>
    </head>
    <body>
      <span>本例子展示了1、如何定义模块 2、如何引入模块</span>
    </body>
</html>
```


