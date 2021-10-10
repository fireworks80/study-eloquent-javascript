const JOURNAL = require('./data.js');

// const phi = (table) => {
//   return (
//     table[3] * table[0] -
//     (table[2] * table[1]) /
//       Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]))
//   );
// };
const phi = ([n00, n01, n10, n11]) => {
  return (n11 * n00 - n10 * n01) / Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));
};

const tableFor = (event, journal) => {
  const table = [0, 0, 0, 0];

  for (let i = 0; i < journal.length; i += 1) {
    let entry = journal[i];
    let idx = 0;

    if (entry.events.includes(event)) idx += 1;
    if (entry.squirrel) idx += 2;

    table[idx] += 1;
  }
  return table;
};

// console.log(tableFor('pizza', JOURNAL));

const journalEvents = (journal) => {
  const events = [];

  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      } // if
    }
  }
  return events;
};

// console.log(journalEvents(JOURNAL));

for (let event of journalEvents(JOURNAL)) {
  const correlation = phi(tableFor(event, JOURNAL));

  if (correlation > 0.1 || correlation < -0.1) {
    // console.log(event + ':', correlation);
  }
}

for (let entry of JOURNAL) {
  if (entry.events.includes('peanuts') && !entry.events.includes('brushed teeth')) {
    entry.events.push('peanut teeth');
  }
}

// console.log(phi(tableFor('peanut teeth', JOURNAL)));

const remove = (array, index) => array.slice(0, index).concat(array.slice(index + 1));

// console.log(remove(['a', 'b', 'c', 'd', 'e'], 2));

// console.log(['apple', 'bugs', 'three'].indexOf('ee'));
// console.log('apple bugs three'.indexOf('ee'));

const sentence = 'Secretarybirds specialize in stomping';
let words = sentence.split(' ');
// console.log(words); // [Secretarybirds, specialize, in, stomping]
// console.log(words.join('. ')); // Secretarybirds. specialize. in. stomping

const max = (...numbers) => {
  // console.log(numbers);
  let result = -Infinity;

  for (let number of numbers) {
    if (number > result) result = number;
  }

  return result;
};

// console.log(max(4, 1, 9, -2)); // 9

const numbers = [5, 1, 7];
// console.log(max(9, ...numbers, 21)); // 7

let words2 = ['never', 'fully'];
// console.log(['will', ...words2, 'understand']);
const result = [
  {
    test: 1,
    border: 2,
  },
];
// console.log(...result);

const randomPointOnCircle = (radius) => {
  const angle = Math.random() * 2 * Math.PI;

  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

// console.log(randomPointOnCircle(2));

// console.log(Math.floor(Math.random()) + 1);

const { name } = { name: 'fuji', age: 23 };
// console.log(name);

const string = JSON.stringify({ squirre: false, events: ['weekend'] });
console.log(string);

// console.log(JSON.parse(string).events);
const { events } = JSON.parse(string);
console.log(events);
