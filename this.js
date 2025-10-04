//全局上下文
console.log(this)//{}

//函数上下文
function f() {
  console.log(this)
}
f()//global

const obj = {
  x: 10,
  getX() {
    console.log(this.x)
  }
};
obj.getX()//10

const obj1 = {
  x: 10,
  getX: () => console.log(this.x)
}
obj1.getX()//undifined

const obj2 = {
  x: 10,
  getX() {
    const fn = () => console.log(this.x)
    fn()
  }
};
obj2.getX()//10

function greet() {
  console.log(this.name);
}
const user = { name: "Bob" };

greet.call(user);  // Bob
greet.apply(user); // Bob
const bound = greet.bind(user);
bound();           // Bob
