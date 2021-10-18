const Vec = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  plus(V) {
    return new Vec(this.x + V.x, this.y + V.y);
  }
  minus(V) {
    return new Vec(this.x - V.x, this.y - V.y);
  }
};

// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// console.log(new Vec(3, 4).length);

const Group = class {
  constructor() {
    this.member = [];
    this.position = 0;
  }

  static from(collection) {
    const group = new Group();
    collection.forEach((val) => group.add(val));
    return group;
  }

  add(val) {
    if (this.has(val)) return;
    this.member.push(val);
  }
  delete(val) {
    this.member = this.member.filter((v) => v !== val);
  }
  has(val) {
    return this.member.includes(val);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
};

// const group = Group.from([10, 20]);

// console.log(group.has(10));
// console.log(group.has(30));
// group.add(30);
// console.log(group);
// group.delete(10);
// console.log(group.has(10));

const GroupIterator = class {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }
  next() {
    if (this.position >= this.group.member.length) return { done: true };
    const result = { value: this.group.member[this.position], done: false };
    this.position += 1;

    return result;
  }
};

// for (let value of Group.from(['a', 'b', 'c'])) {
//   console.log(value);
// }

let map = { one: true, two: true, hasOwnProperty: true };
console.log(Object.prototype.hasOwnProperty.call(map, 'hasOwnProperty'));
