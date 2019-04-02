(function (i) {
    setTimeout(function () {
        console.log(i);
    }, 100);
})(i);

(i) => {
    setTimeout(function () {
        console.log(i);
    }, 100);
}

//构造函数方式
function Type1() {
    this.a = 3;
    this.b = 4;
    this.c = function () {};
};
var demo1 = new Type1();
//工厂方式
function Type2() {
    var temp = new Object;
    temp.a = 3;
    temp.b = 4;
    temp.c = function () {};
    return temp;
};
var demo2 = new Type2();
//原型方式
function Type3() {}
Type3.prototype.a = 3;
Type3.prototype.b = 4;
Type3.prototype.c = function () {};
var demo3 = new Type2();
//动态原型
function Type4() {
    this.a = 3;
    this.b = 4;
    if (typeof autoProCar.initialized == "undefined") {
        Type4.prototype.c = function () {};
        Type4.initialized = true;
    }
}

//JS 实现继承的几种方式
//1.对象冒充-可以实现多继承
function ClassA(sColor) {
    this.color = sColor;
    this.sayColor = function () {
        alert(this.color);
    };
}

function ClassB(sColor, sName) {
    this.newMethod = ClassA;
    this.newMethod(sColor); //获取A的属性和方法
    delete this.newMethod; //删除A的引用，防止实例化后再次被调用

    //delete 后再赋予新的属性方法，防止影响A
    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}
//2.call(),apply() 方法
function ClassB(sColor, sName) {
    ClassA.call(this, sColor);
    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}

function ClassB(sColor, sName) {
    ClassA.apply(this, new Array(sColor));
    ClassA.apply(this, arguments);
    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}
//3.原型链继承(无参数-不支持多继承)
function ClassA() {}
ClassA.prototype.color = "blue";
ClassA.prototype.sayColor = function () {
    alert(this.color);
};

function ClassB() {}
ClassB.prototype = new ClassA(); //直接把A的实例赋值给B的原型
//新的属性方法-必须放在原型复制之前，否则会别清除掉
ClassB.prototype.name = "";
ClassB.prototype.sayName = function () {
    alert(this.name);
};
//4.混合继承方式-即实现了带参差异化，也实现了无参原型方法的复用
function ClassA(sColor) {
    this.color = sColor;
}
ClassA.prototype.sayColor = function () {
    alert(this.color);
};

function ClassB(sColor, sName) {
    ClassA.call(this, sColor); //继承属性
    this.name = sName;
}
ClassB.prototype = new ClassA(); //继承方法
ClassB.prototype.sayName = function () {
    alert(this.name);
};

//JS模块化演进
//1.只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块
let a = 0,
    b = 1;

function f1() {};

function f2() {};
//... 这种方式容易污染全局变量,函数命名冲突,且不易控制共有和私有属性方法，可随意修改
//2.改进
var modelA = {
    a: 0,
    b: 1,
    f1: function () {},
    f2: function () {},
};
var modelb = (function (param) {
    var a = 0,
        b = 1;
    var f1 = function () {};
    var f2 = function () {};
    return {
        f1: f1,
        f2: f2
    };
})(param);
//虽然解决了私有变量问题，模块管理还是 不清晰
//Cmomonjs规范 通过require 同步加载资源
var math = require('math');
math.add(2, 3); // 5
//AMD规范
//define(id?, dependencies?, factory) 依赖前置。/ 实现： RequireJS 使用于Web前端
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
    exports.verb = function () {
        return beta.verb(); // or: return require("beta").verb();
    }
});
define(["alpha"], function (alpha) {
    return {
        verb: function () {
            return alpha.verb() + 1;
        }
    }
});
define({
    add: function (x, y) {
        return x + y;
    }
});
//CMD规范-依赖就近，用的时候再require/ 实现：Sea.js 适用于Node.js 中
define(function (require, exports, module) {
    var $ = require('jquery');
    var Spinning = require('./spinning');
    exports.doSomething = '';
    module.exports = '';
})
//ES6规范 ES6标准发布后，module成为标准 实现： Babel 浏览器支持不太好
//FileA
export const add = function (a, b) {
    return a + b
}
export const subtract = function (a, b) {
    return a - b
}
//FileB
import {
    add,
    subtract
} from 'path'
add(1, 2)
substract(3, 2)