class Person {
  constructor(name='noname', age=20) {
    this.name = name;
    this.age = age;
  }

  toJSON() {
    const obj = {
      name: this.name,
      age: this.age,
    }
    return JSON.stringify(obj);
  }
}

const f = a => a*a;

module.exports = { Person, f }; //要匯出很多個東西的話可以包成object

// {
//   person: person,
//   f: f,
// }