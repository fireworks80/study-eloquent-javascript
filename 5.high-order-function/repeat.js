// import SCRIPTS from './script';
const SCRIPTS = require('./script');

// for (let i = 0; i < 10; i += 1) {
//   console.log(i);
// }

// N번 반복하는 함수로 추상

{
  const repeat = (n) => {
    for (let i = 0; i < n; i += 1) {
      console.log(i);
    }
  };
}
// n번 반복하면서 다른 동작을 하는 함수로

{
  const repeat = (n, action) => {
    for (let i = 0; i < n; i += 1) {
      action(i);
    }
  };

  // repeat(3, console.log);

  // const labels = [];
  // repeat(5, (i) => {
  //   labels.push(`Unit ${i + 1}`);
  // });

  // console.log(labels);

  const unless = (test, then) => {
    if (!test) then();
  };

  // repeat(3, (n) => {
  //   unless(n % 2 == 1, () => {
  //     console.log(n, ' is even');
  //   });
  // });
}

{
  const greaterThan = (n) => (m) => m > n;
  const greaterThan10 = greaterThan(10);

  // console.log(greaterThan10(11)); // true
}

{
  const noisy = (f) => {
    return (...args) => {
      console.log('Calling with: ', args);

      const result = f(...args);
      console.log('Calling with: ', args, ' result: ', result);
    };
  };

  // noisy(Math.min)(3, 2, 1);
}

{
  // console.log(SCRIPTS);
  // 현재  사용중인 문자  찾기

  const filter = (array, test) => {
    let passed = [];

    for (let element of array) {
      if (test(element)) passed.push(element);
    } // for
    return passed;
  };

  // console.log(filter(SCRIPTS, (script) => script.living));

  const passed = SCRIPTS.filter((script) => script.living === true);
  // console.log(passed);
}

{
  const map = (array, transform) => {
    const mapped = [];

    for (let element of array) {
      mapped.push(transform(element));
    }

    return mapped;
  };

  const rtlScripts = SCRIPTS.filter((script) => script.direction === 'rtl');
  const rtlNames = rtlScripts.map((script) => script.name);

  // console.log(rtlNames);
  // console.log(map(rtlScripts, (script) => script.name));
}

{
  const reduce = (array, combine, start) => {
    let current = start;

    for (let element of array) {
      current = combine(current, element);
    }
    return current;
  };

  // console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));

  // console.log([1, 2, 3, 4].reduce((a, b) => a + b));
}

{
  const characterCount = (script) => {
    return script.ranges.reduce((count, [from, to]) => {
      return count + (to - from);
    }, 0);
  };

  const result = SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  });

  // console.log(result);

  // let biggist = null;

  // for (let script of SCRIPTS) {
  //   if (biggist === null || characterCount(biggist) < characterCount(script)) {
  //     biggist = script;
  //   }
  // }

  // console.log(biggist);
}

{
  // 각  언어에  속한  문자를  계산

  const countBy = (items, groupName) => {
    const counts = [];

    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex((c) => c.name === name); // true / false 반환

      known === -1 ? counts.push({ name, count: 1 }) : counts[known].count++;
    } // for

    return counts;
  };
  // [{name: false, count: 2}, {name: true, count: 3}]

  // console.log(countBy([1, 2, 3, 4], (n) => n > 2));

  const characterScript = (code) => {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => code >= from && code < to)) {
        return script;
      } // if
    }
    return null;
  };
  // {name: 'Latin', ...}

  const textScripts = (text) => {
    let scripts = countBy(text, (char) => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.name : 'none';
    }).filter(({ name }) => name !== 'none');

    let total = scripts.reduce((n, { count }) => n + count, 0);
    if (!total) return 'No scripts found';

    return scripts
      .map(({ name, count }) => {
        return `${Math.round((count * 100) / total)}% ${name}`;
      })
      .join(', ');
  };

  // console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
}

{
  // 추상화는  되어  있지만  가독성이  낮다
  // const average = (array) => array.reduce((a, b) => a + b) / array.length;
  // console.log(Math.round(average(SCRIPTS.filter((s) => s.living).map((s) => s.year))));
  // console.log(Math.round(average(SCRIPTS.filter((s) => !s.living).map((s) => s.year))));

  let total = 0,
    count = 0;

  for (let script of SCRIPTS) {
    if (script.living) {
      total += script.year;
      count += 1;
    }
  }

  // console.log(Math.round(total / count));
}

{
  // flattening

  const arrays = [[1, 2, 3], [4, 5], [6]];

  const flattening = (array) => {
    return array.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
  };

  // console.log(flattening(arrays));

  const loop = (value, testFn, updateFn, printFn) => {
    if (!testFn(value)) return;
    printFn(value);
    loop(updateFn(value), testFn, updateFn, printFn);
  };

  // loop(
  //   3,
  //   (n) => n > 0,
  //   (n) => n - 1,
  //   console.log
  // );
}

{
  const every = (() => {
    const _every = (arr, total, fn, result) => (result && total > -1 ? (arr, total - 1, fn, fn(arr[total])) : result);
    return (arr, fn) => _every(arr, arr.length - 1, fn, true);
  })();

  const everySome = (array, predicate) => !array.some((el) => !predicate(el));

  // console.log(everySome([1, 3, 5], (n) => n < 10));
  // console.log(everySome([2, 4, 16], (n) => n < 10));
  // console.log(everySome([], (n) => n < 10));
}

{

  // const dominantDirection = (string) => {
  //   const scripts = [];
  //   for (const str of string) {
  //     const point = str.codePointAt(0);

  //     for (const script of SCRIPTS) {
  //       if (script.ranges.some(([from, to]) => point >= from && point < to)) {
  //         const direction = script.direction;
  //         const known = scripts.findIndex((c) => c.direction === direction);

  //         known === -1 ? scripts.push({ direction, count: 1 }) : (scripts[known].count += 1);
  //       } // if
  //     } // for
  //   } // for
  //   // console.log(scripts);
  //   return scripts.reduce((a, b) => (a.count > b.count ? a : b)).direction;
  // };

  const characterCount = (point) => {
    for (const script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => point >= from && point < to)) {
        return script;
      }
    } // for
    return null;
  };

  const countBy = (string, getDirection) => {
    const scripts = [];
    for (const str of string) {
      const direction = getDirection(str);
      const known = scripts.findIndex((c) => c.direction === direction);

      known === -1 ? scripts.push({ direction, count: 1 }) : (scripts[known].count += 1);
    } // for
    return scripts;
  };

  const dominantDirection = (string) => {
    const scripts = countBy(string, (c) => {
      const script = characterCount(c.codePointAt(0));
      return script ? script.direction : 'none';
    }).filter(({ direction }) => direction !== 'none');

    return scripts.reduce((a, b) => (a.count > b.count ? a : b)).direction;
  };

  console.log(dominantDirection('Hey, مساء الخير'));
  // 'ltr' or 'rtl'
}
