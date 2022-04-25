// const Person = require('./Person');
// const tool = require('./Person');
const { Person, f } = require('./Person');

// const P1 = new tool.Person('Bill', 26);
const P1 = new Person('Bill', 24);
const P2 = new Person('David', 30);

console.log(P1.toJSON());
console.log(P2.toJSON());
console.log(P1.toString());
console.log(P2.toString());
console.log(f(7));