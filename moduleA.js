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