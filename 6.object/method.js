{
  const rabbit = {};
  rabbit.speak = (line) => {
    console.log(`The rabbit says ${line}`);
  };

  // rabbit.speak(`I'm alive.`);

  function speak(line) {
    console.log(`The ${this.type} rabbit says ${line}`);
  }

  const whiteRabbit = { type: 'white', speak };
  const hungryRabbit = { type: 'hungry', speak };

  // whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
  // hungryRabbit.speak('I could use a carrot right now.');

  // speak.call(hungryRabbit, 'Burp!');

  function normalize() {
    console.log(this.coords.map((n) => n / this.length));
  }

  // normalize.call({ coords: [0, 2, 3], length: 5 });
}

{
  const empty = {};
  console.log(empty.toString); // node: [Function: toString], browser: ƒ toString() { [native code] }

  console.log(empty.toString()); // [object Object]

  // console.log(Object.getPrototypeOf({}) === Object.prototype);

  // Object.getPrototypeOf => return object.prototype

  console.log(Object.getPrototypeOf(Math.abs) == Function.prototype); // true
  console.log(Object.getPrototypeOf([]) === Array.prototype); // true

  // Object.create
  const protoRabbit = {
    speak(line) {
      console.log(`The ${this.type} rabbit says ${line}`);
    },
  };

  const killerRabbit = Object.create(protoRabbit);
  killerRabbit.type = 'killer';
  // killerRabbit.speak('SKREEEE!'); // The killer rabbit says SKREEEE!
}

{
  // 생성자는 자동으로 prototype속성을 갖는다.
  // 기본적으로 Object.prototype에서 파생된 비어 있는 일반 객체를 갖는다.
  // 생성자는 함수이므로 실제 프로토타입은 Function.prototype

  function Rabbit(type) {
    this.type = type;
  }

  Rabbit.prototype.speak = function (line) {
    console.log(`The ${this.type} rabbit says ${line}`);
  };

  const weirdRabbit = new Rabbit('weird');

  // console.log(Object.getPrototypeOf(Rabbit) == Function.prototype); // true
  // console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype); // true
}

{
  // class 표기법

  class Rabbit {
    constructor(type) {
      this.type = type;
    }

    speak(line) {
      console.log(`The ${this.type} rabbit says ${line}`);
    }
  }

  const killerRabbit = new Rabbit('killer');
  const blackRabbit = new Rabbit('black');

  // killerRabbit.speak('KRasss');

  Rabbit.prototype.teeth = 'small';

  console.log(killerRabbit.teeth); // small

  killerRabbit.teeth = 'long, sharp, and bloody';
  // console.log(killerRabbit.teeth); // long, sharp, and bloody

  // console.log(blackRabbit.teeth); // small
  // console.log(Rabbit.prototype.teeth); // small

  // 다형성
  Rabbit.prototype.toString = function () {
    return `a ${this.type} rabbit`;
  };

  console.log(String(blackRabbit));
}

{
  // map
  const ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62,
  };

  // console.log(`Julia is ${ages['Julia']}`); // 62
  // console.log(`Is Jack's age know? ${'Jack' in ages}`); // false
  // console.log(`Is toString's age known? ${'toString' in ages}`); // true

  // console.log(`${'toString' in Object.create(null)}`); // false
}
