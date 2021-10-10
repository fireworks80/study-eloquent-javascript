const listOfnumber = [2, 3, 5, 7, 11];
console.log(listOfnumber[2]);
console.log(listOfnumber[0]);
console.log(listOfnumber[2 - 1]);

const doh = 'Doh';

console.log(typeof doh.toUpperCase);

console.log(doh.toUpperCase());

const sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);

console.log(sequence); // [1,2,3,4,5]
console.log(sequence.pop()); // 5
console.log(sequence); // [1,2,3,4]

const day1 = {
  squirrel: false,
  events: ['work', 'touched tree', 'pizza'],
};

console.log(day1.squirrel);
console.log(day1.wolf);

day1.wolf = false;
console.log(day1.wolf);

const anObject = { left: 1, right: 2 };
console.log(anObject.left); // 1

delete anObject.left;
console.log(anObject.left); // unefined

console.log('left' in anObject); //false

console.log('right' in anObject); // true

console.log(console.log(Object.keys({ x: 1, y: 2, z: 3 }))); // [x, y, z]

const objA = { a: 1, b: 2 };
Object.assign(objA, { b: 3, c: 4 });

console.log(objA); // {a: 1, b: 3, c: 4}

const object1 = { value: 10 };
const object2 = object1;
const object3 = { value: 10 };

console.log(object1 === object2); // true
console.log(object1 === object3); // false

object1.value = 15;
console.log(object2.value); // 15

console.log(object3.value); // 10

const score = { visitors: 0, home: 0 };

score.visitors = 1; // ok

// score = { visitors: 1, home: 1 }; // error

const journal = [];

const addEntry = (events, squirrel) => {
  journal.push({ events, squirrel });
};

addEntry(['work', 'touched tree', 'pizza', 'running', 'television'], false);
addEntry(['work', 'ice cream', 'cauiflower', 'lasagna', 'touched tree', 'brushed teeth'], false);
addEntry(['weekend', 'cycling', 'break', 'peanuts', 'beer'], true);
console.log(journal);
