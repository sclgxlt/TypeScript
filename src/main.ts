//基本类型-boolean number string 数组/泛型组数Array<T> 元组 Tuple enum any void Null 和 Undefined Never
//类型断言
let a: boolean = true;
let b: number = 1;
let c: string = "1";
let d: string[] = ["1", "2"];
//Array / ReadonlyArray
let e: Array<boolean> = [true, false];
let e1: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = e1;
//ro[0] = 12; // error!
//ro.push(5); // error!
//ro.length = 100; // error!
//e1 = ro; // error!
//e1 = ro as number[];

let f: [string, number, boolean] = ["1", 1, true];
enum Color {
  red = 3,
  blue,
  white
}
let g: Color = Color.blue; //Color[3]
let h: any = 1; //任何类型
function voidFun(): void {
  console.log("no return");
}
//never必须有不可到达的终点
function error(message: string): never {
  throw new Error(message);
  //while(true)
}
//类型断言
let i: any = "this is a string";
let j: number = (<string>i).length;
let k: number = (i as string).length;
//let关键字是JavaScript的一个新概念，TypeScript实现了它。
//很多常见的问题都可以通过使用let来解决，所以尽可能地使用let来代替var。
var typeDiff = function() {
  for (let index = 0; index < 10; index++) {
    setTimeout(() => {
      console.log(index);
    }, 100);
  }
  // for (var index = 0; index < 10; index++) {
  //   setTimeout(() => {
  //     console.log(index);
  //   }, 1);
  // }
};
typeDiff();

{
  var l = 1;
  let m = 1;
}

//console.log(l);
//console.log(m);
//函数
let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
//function ggg(x: string): void { }
let myAdd1: (x: number, y: number) => void = function(x, y): void {
  console.log(x + y);
};

//可选参数和默认参数
function buildName(firstName: string, lastName = "2", lastName2 = "4") {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
buildName("1", undefined, "5");

//buildName("1", lastName2:"5");
//方法重载
function pickCard(x: { a: string }): number;
function pickCard(x: number): { a: string };
function pickCard(x): any {
  if (typeof x == "object") {
    return 1;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: "0" };
  }
}
pickCard(1);
pickCard({ a: "1" });
//pickCard(true);
//TypeScript泛型-代码重用性
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("myString");
output = identity("myString");
let myIdentity: <T>(arg: T) => T = identity; // function <T>(arg: T) { return arg;}
myIdentity("1");
let myIdentity1: { <T>(arg: T): T } = identity; //对象字面量表示泛型函数
//引申出泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let myIdentity2: GenericIdentityFn = identity;
//T作为接口参数
interface GenericIdentityFn1<T> {
  (arg: T): T;
}
let myIdentity3: GenericIdentityFn1<number> = identity;

//*****类*****
//对比js中类的几种定义方式-demo.js文件中
class Greeter {
  greeting: string;
  private greeting1: string;
  get Getreeting1() {
    return this.greeting1;
  }
  set Setreeting1(val: string) {
    this.greeting1 = val;
  }
  protected greeting2: string;
  readonly greeting3: string;
  constructor(message: string) {
    this.greeting = message;
  }
  static origin = { x: 0, y: 0 };
  greet() {
    return "Hello, " + this.greeting;
  }
}
var demo1 = new Greeter("test");
//泛型类-就是在类的基础上增加了泛型参数
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T = function<T>(x: T): T {
    return x;
  };
}
var test: GenericNumber<number>;
test = new GenericNumber<number>();
//泛型约束
interface Limit {
  length: number;
}
class GenericNumberLimit<T extends Limit> extends GenericNumber<T> {
  GetLength() {
    return this.zeroValue.length;
  }
}
//构造函数约束
function create<T>(c: { new (): T }): T {
  return new c();
}

//类的继承 默认访问修饰符Public
//对比JS中类的继承-demo.js文件中
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal {
  move(distanceInMeters = 5) {
    console.log("123...");
    super.move(distanceInMeters);
  }
}
class Horse extends Animal {
  constructor(name: string) {
    super(name); //必须执行基类构造函数在访问this钱
  }
  move(distanceInMeters = 45) {
    console.log("456...");
    super.move(distanceInMeters);
  }
}
let sam = new Snake("123");
let tom: Animal = new Horse("456");
//抽象类 -抽象类做为其它派生类的基类使用。一般不会直接被实例化
abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log("Department name: " + this.name);
  }
  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super("111"); // 在派生类的构造函数中必须调用 super()
  }
  //   printName(): void {
  //     super.printName();
  //   }
  printMeeting(): void {
    console.log("222");
  }
  generateReports(): void {
    console.log("333");
  }
}

//接口 TypeScript里面，接口的作用就是为了代码定义契约。
interface LabelledValue {
  label: string;
  size?: number;
  readonly width: number;
  readonly height: number;
  [propName: string]: any;
  GetLength(a: string, b: boolean): number;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
let myObj: LabelledValue = {
  size: 10,
  label: "长度为10",
  width: 100,
  height: 30,
  palceHolder: "test",
  autoComplete: true,
  GetLength: function(x: string, y: boolean) {
    return this.size;
  }
};
//myObj.width = 120;
printLabel(myObj);

//接口实现 和C#或Java一样，TypeScript也能够用接口来明确的强制一个类去符合某种契约。
interface ClockInterface {
  //实例部分
  tick();
}
//静态部分
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("DigitalClock");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("AnalogClock");
  }
}
function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
//接口的继承
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

//****接口继承类****
//当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
//接口同样会继承到类的private和protected成员
//如果类包含private和protected成员 这个接口类型只能被这个类或其子类所实现
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control implements SelectableControl {
  select() {}
}


// class Form implements SelectableControl {
//   select() {}
// }

//****类型兼容性****
interface Named {
  name: string;
}
class Person {
  name: string;
}
let p: Named;
p = new Person(); //可以正常兼容-成员和类型一直则可以兼容，排出包含私有成员的情况

let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // 
//x = y; // Error
//协变，逆变（典型例子,父转子，子转父）

//****模块化****
//常用的模块加载器Commonjs,RequireJs ES6等 
//JS 模块化的演变-查看DEMO-JS

import { mainValidator } from "./ZipCodeValidator";
let myValidator = new mainValidator();
console.log(myValidator.isAcceptable("11111"));

//****命名空间****
import { Validation } from "./namespace";
let test1 = new Validation.ZipCodeValidator();
console.log(test1.isAcceptable("12345"));
let test2 = new Validation.LettersOnlyValidator();

