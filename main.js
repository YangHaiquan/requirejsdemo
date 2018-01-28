//主模块依赖jquery、moduleB这2个模块
alert("主模块加载成功!");
require(['jquery-1.10.2', 'moduleB'], function ($, b){
　　　　// some code here
		alert(b.add(2, 2));
　　});
