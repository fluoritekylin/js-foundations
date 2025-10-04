function Foo() {}
console.log(Foo.prototype); // {}

const Bar = () => {};
console.log(Bar.prototype); // undefined

const hasArguments = () => {
    console.log(arguments);
}
hasArguments() //外层arguments

const useArgs = (...args) => {
    console.log(args);
}
useArgs(1, "a", true) //[1, "a", true]