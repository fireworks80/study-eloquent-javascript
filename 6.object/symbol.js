{
  let sym = Symbol('name');
  // console.log(sym == Symbol('name')); // false

  const Rabbit = class {};
  const blackRabbit = new Rabbit();

  Rabbit.prototype[sym] = 55;

  // console.log(blackRabbit[sym]); // 55
  // console.log(sym); // Symbol(name);

  const toStringSymbol = Symbol('toString');
  Array.prototype[toStringSymbol] = function () {
    return `${this.length} cm of blue yarn`;
  };

  // console.log([1, 2].toString()); // 1, 2
  // console.log([1, 2][toStringSymbol]()); // 2 cm of blue yarn

  let stringObject = {
    [toStringSymbol]() {
      return 'a jute rope';
    },
  };

  // console.log(stringObject[toStringSymbol]()); // a jute rope
}

{
  let okIterator = 'OK'[Symbol.iterator]();
  // console.log(okIterator); // Object [String Iterator] {}
  // console.log(okIterator.next()); // {value: 'O', done: false}
  // console.log(okIterator.next()); // {value: 'k', done: false}
  // console.log(okIterator.next()); // {value: undefined, done: true}
}

{
  const Matrix = class {
    constructor(width, height, element = (x, y) => undefined) {
      this.width = width;
      this.height = height;
      this.content = [];

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          this.content[y * width + x] = element(x, y);
        } // for
      } // for
    }

    get(x, y) {
      return this.content[y * this.width + x];
    }

    set(x, y, value) {
      this.content[y * this.width + x] = value;
    }
  };

  const MatrixIterator = class {
    constructor(matrix) {
      this.x = 0;
      this.y = 0;
      this.matrix = matrix;
    }

    next() {
      if (this.y === this.matrix.height) return { done: true };

      const value = {
        x: this.x,
        y: this.y,
        value: this.matrix.get(this.x, this.y),
      };

      this.x += 1;

      if (this.x === this.matrix.width) {
        this.x = 0;
        this.y += 1;
      }

      return { value, done: false };
    } // next
  };

  Matrix.prototype[Symbol.iterator] = function () {
    return new MatrixIterator(this);
  };

  let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);

  // for (let { x, y, value } of matrix) {
  //   console.log(x, y, value);
  // }

  const SymmetricMatrix = class extends Matrix {
    constructor(size, element = (x, y) => undefined) {
      super(size, size, (x, y) => (x < y ? element(y, x) : element(x, y)));
    }

    set(x, y, value) {
      super.set(x, y, value);
      if (x !== y) {
        super.set(y, x, value);
      }
    }
  };

  let matrix2 = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`);
  // console.log(matrix2.get(2, 3)); // 3, 2

  // instanceof
  console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix); // true
  console.log(new SymmetricMatrix(2) instanceof Matrix); // true
  console.log(new Matrix(2, 2) instanceof SymmetricMatrix); // false
  console.log([1] instanceof Array); // true
}

{
  //getter, setter, static

  let varyingSize = {
    get size() {
      return Math.floor(Math.random() * 100);
    },
  };

  // console.log(varyingSize.size);

  const Temperature = class {
    constructor(celsius) {
      this.celsius = celsius; // 섭씨
    }

    get fahrenheit() {
      // 화씨
      return this.celsius * 1.8 + 32;
    }

    set fahrenheit(value) {
      this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) {
      return new Temperature((value - 32) / 1.8);
    }
  };

  let temp = new Temperature(22);
  // console.log(temp);
  // console.log(temp.fahrenheit); // 71.6

  temp.fahrenheit = 86;
  // console.log(temp.celsius); // 30

  let temp2 = Temperature.fromFahrenheit(100);
  // console.log(temp2.fahrenheit); // 100
}
