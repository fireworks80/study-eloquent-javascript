// 연습문제 1:
// 1. 두개의  인수 start, end를 받고 start부터 end까지 모든 숫자를 포함하는 배열을 반환하는 range 함수 만들기
// 2. 숫자 배열을 인수로 받고 배열에 있는 숫자의 합계를 반환하는 sum 함수
// const rangeForwards = (() => {
//   const _range = (start, end, step, acc) =>
//     start <= end ? _range(start + step, end, step, acc + ',' + start) : JSON.parse('[' + acc.substring(1) + ']');
//   return (start, end, step = 1) => _range(start, end, step, '');
// })();

const sum = (() => {
  const _sum = (arr, idx, acc) => (idx > -1 ? _sum(arr, idx - 1, acc + arr[idx]) : acc);
  return (arr) => _sum(arr, arr.length - 1, 0);
})();

// console.log(rangeForwards(1, 10, 2));
// console.log(sum(range(1, 5)));

// 보너스:
// 1. 배열을 만들때 'step' 값을 받는다.
// 2. step이 없으면 기존대로 동작 (1씩 증가) range(1, 10, 2) 호출시 [1,3,5,7,9] 반환
// 3. range(5, 2, -1) => [5,4,3,2]

// console.log(reverse([1, 2, 3, 4, 5]));

const range = (() => {
  const _range = (start, end, step, acc) =>
    start <= end ? _range(start + step, end, step, acc + ',' + start) : JSON.parse('[' + acc.substring(1) + ']');

  const reverse = (() => {
    const _reverse = (arr, acc) => (arr.length ? _reverse(arr, [...acc, arr.pop()]) : acc);
    return (arr) => _reverse(arr, []);
  })();

  return (start, end, step) => {
    if ((start > end && step > 0) || (start < end && step < 0)) throw Error('Invalide step');
    step = Math.abs(step);

    return start < end ? _range(start, end, step, '') : reverse(_range(end, start, step, ''));
  };
})();

// console.log(range(1, 10, 2));

// 연습문제 2:
// 1. reverseArray 함수는 배열을 받아서 동일한 요소가 반대 순서로 존재하는 '새로운 배열'을 리턴한다.
// 2. reverseArrayInPlace 함수는 reverse 메서드가 수행하는 작업을 수행, 인수로 주어진 배열의 요소를 역순으로 변경 (새로운 배열을 만들지 않는다)
// 3. 둘 중 어느 함수도 표준 reverse 메서드를 사용하면 안된다.
// 96쪽 '함수와 부수 효과' 절에 나오는 부수 효과와 순수 함수에 대한 내용을 떠올려 보면 이 둘 중에서 어떤 함수가 더 많은 상황에서 사용될 것 같은가?
// 어느 쪽이 더 속도가 빠른가?

const list = {
  table: {
    3: ([arr, acc, cnt]) => {
      acc.push(arr[cnt]);
      return acc;
    },
    2: ([arr, idx]) => {
      const old = arr[idx];
      arr[idx] = arr[arr.length - 1 - idx];
      arr[arr.length - 1 - idx] = old;
      return arr;
    },
  },
  do(...rest) {
    return this.table[rest.length]?.(rest);
  },
};

const reverseArray = (() => {
  const _recursive = (arr, cnt, acc) => (cnt > -1 ? _recursive(arr, cnt - 1, list.do(arr, acc, cnt)) : acc);
  return (arr) => _recursive(arr, arr.length - 1, []);
})();

// console.log(reverseArray([1, 2, 3]));
// console.log(reverseArray(['a', 'b', 'c']));

let arrayValue = [1, 2, 3, 4, 5];

const reverseArrayInPlace = ((arr) => {
  const _reverseArrayInPlace = (arr, max, idx) =>
    idx < max ? _reverseArrayInPlace(list.do(arr, idx), max, idx + 1) : arr;
  return (arr) => _reverseArrayInPlace(arr, arr.length / 2, 0);
})();

// reverseArrayInPlace(arrayValue);
// console.log(arrayValue);

// 연습문제 3:
// 리스트 (배열과 혼동해서는 안 됨)
// ex:
// const list = {
//   value: 1,
//   rest: {
//     value: 2,
//     rest: {
//       value: 3,
//       rest: null,
//     },
//   },
// };
// 1. [1,2,3]을 인수로 받아서 리스트 구조를 만드는 arrayToList 함수를 작성
// 2. 그리고 리스트에서 배열을 생성하는 listToArray 함수를 작성
// 3. 요소와 리스트를 인수로 받고 해당 리스트의 맨 앞에 요소를 추가해서 새로운 리스트를 만드는 prepend 헬퍼 함수, 리스트와 숫자를
//    인수로 받고 해당 리스트에 주어진 위치(첫 번째 요소를 잠조하는 0 포함)의 요소를 반환하거나 해당되는 요소가 없다면 undefined를 반환하는 nth 헬퍼 함수를 작성
//  아직 작성해 보지 않았다면 nth 재귀 함수 버전도 작성

const arrayToList = (() => {
  const _recursive = (arr, idx, acc) => (idx > -1 ? _recursive(arr, idx - 1, { value: arr[idx], rest: acc }) : acc);
  return (arr) => _recursive(arr, arr.length - 1, null);
})();

// console.log(arrayToList([1, 2, 3]));

const listToArray = (() => {
  const _listToArray = (list, acc) =>
    list.rest ? _listToArray(list.rest, [...acc, list.value]) : [...acc, list.value];

  return (calcList) => _listToArray(calcList, []);
})();

// console.log(listToArray(arrayToList([10, 20])));

const prepend = (el, list) => ({ value: el, rest: list });

// console.log(prepend(10, prepend(20, null)));

const nth = (list, num) => {
  if (!list) return undefined;
  if (!num) return list.value;

  return nth(list.rest, num - 1);
};

// console.log(nth(arrayToList([10, 20, 30]), 0));

// 연습문제 4:
// '==' 연산자는 아이덴티티로 객체를 비교 한다.
// 1. 인수로 두개의 값을 받아서 값이 같거나 속성이 동일한(속성의 값은 deepEqual 함수를 재귀 호출한 경우와 비교했을 때 같음) 객체인 경우에만 true를 반환하는 deepEqual 함수를 작성

// '==='연산자를 사용해 값을 직접 비교해야 하는지 또는 새당 속성을 비교해야 하는지 확인하기 위해 typeof 연산자를 사용할 수 있다.
// 두 값이 모두 'object'가 나오면 깊은 비교를 해야 한다. 하지만 typeof null도 'object'가 나오는데 오래된 문제 때문에 어색한 예외 처리를 해야 한다.
// Object.keys 함수는 객체의 속성을 비교하기 위해 객체 속성을 확인해야 할 때 사용 할 수 있다.

const obj = { here: { is: 'an' }, object: 2 };

const deepEqual = (a, b) => {
  if (a === b) return true;

  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') return false;

  const KeysA = Object.keys(a);
  const KeysB = Object.keys(b);

  if (KeysA.length !== KeysB.length) return false;

  for (const key of KeysA) {
    if (!KeysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
};

// console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, { here: 1, object: 2 }));
// console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
