const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

const buildGraph = (edges) => {
  const graph = [];
  const addEdge = (from, to) => {
    graph[from] ? graph[from].push(to) : (graph[from] = [to]);
  };

  edges
    .map((e) => e.split('-'))
    .forEach(([from, to]) => {
      addEdge(from, to);
      addEdge(to, from);
    });

  return graph;
};

const roadGraph = buildGraph(roads);

const VillageState = class {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    
    if (!roadGraph[this.place].includes(destination)) return this;

    const parcels = this.parcels.map(p => {
      if (p.place !== this.place) return p;
      return {place: destination, address: p.address};
    }).filter(p => p.place !== p.address);

    return new VillageState(destination, parcels);
  }
};

// const first = new VillageState('Post Office', [{place: 'Post Office', address: 'Alice\'s House'}]);

// const next = first.move('Alice\'s House');
// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);
// console.log(first.parcels);

const runRobot = (() => {
  let turn = 0;
  const _runRobot = (state, robot, memory) => {
    debugger;
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
    console.log(state);
    turn += 1;
    return !state.parcels.length ? console.log(`Done in ${turn} turns`) : _runRobot(state, robot, memory);
  };
  return (state, robot, memory) => _runRobot(state, robot, memory);
})();

const randomPick = (array) => {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
};

const randomRobot = (state) => ({direction: randomPick(roadGraph[state.place])});

VillageState.random = function(parcelCount = 3) {
  const getPlace = (place, address) => place === address ? getPlace(randomPick(Object.keys(roadGraph)), address) : {place, address};
  const setParcelList = (cnt, idx, address, parcels) => idx < cnt ? setParcelList(cnt, idx + 1, randomPick(Object.keys(roadGraph)), [...parcels, getPlace(randomPick(Object.keys(roadGraph)), address)]) : parcels;

  return new VillageState('Post Office', setParcelList(parcelCount, 0, randomPick(Object.keys(roadGraph)), []));
};

// runRobot(new VillageState.random(), randomRobot);

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

const routeRobot = (state, memory) => {
  if (!memory.length) memory = mailRoute;
  return {direction: memory[0], memory: memory.slice(1)};
};

const findRoute = (graph, from, to) => {
  const work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i += 1) {
    const {at, route} = work[i];

    for (let place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some(w => w.at === place)) {
        work.push({at: place, route: route.concat(place)});
      } // if
    } // for
  } // for
};

const goalOrientedRobot = ({place, parcels}, route) => {
  if (!route.length) {
    const parcel = parcels[0];

    // if (parcel.place !== place) {
    //   route = findRoute(roadGraph, place, parcel.place);
    // } else {
    //   route = findRoute(roadGraph, place, parcel.address);
    // }// if

    route = findRoute(roadGraph, place, parcel[parcel.place !== place ? 'place' : 'address']);
  }
  return {direction: route[0], memory: route.slice(1)};
};

(() => {
  let active = null;

  const places = {
    "Alice's House": {x: 279, y: 100},
    "Bob's House": {x: 295, y: 203},
    "Cabin": {x: 372, y: 67},
    "Daria's House": {x: 183, y: 285},
    "Ernie's House": {x: 50, y: 283},
    "Farm": {x: 36, y: 118},
    "Grete's House": {x: 35, y: 187},
    "Marketplace": {x: 162, y: 110},
    "Post Office": {x: 205, y: 57},
    "Shop": {x: 137, y: 212},
    "Town Hall": {x: 202, y: 213}
  };

  const placeKeys = Object.keys(places);
  const speed = 2;

  const Animation = class {
    constructor(worldState, robot, robotState) {
      this.worldState = worldState;
      this.robot = robot;
      this.robotState = robotState;
      this.turn = 0;

      const outer = (window.__sandbox ? window.__sandbox.output.div : document.body);
      const doc = outer.ownerDocument;
      
      this.node = outer.appendChild(doc.createElement('div'));
      this.node.style.cssText = 'position: relative; line-height: 0.1; margin-left: 10px';

      this.map = this.node.appendChild(doc.createElement('img'));
      this.map.src = 'img/village2x.png';
      this.map.style.cssText = 'vertical-align: -8px';

      this.robotElt = this.node.appendChild(doc.createElement('div'));
      this.robotElt.style.cssText = `position: absolute; transition: left ${0.8 / speed}s, top ${0.8 / speed}s`;

      const robotPic = this.robotElt.appendChild(doc.createElement('img'));
      robotPic.src = 'img/robot_moving2x.gif';

      this.parcels = [];

      this.text = this.node.appendChild(doc.createElement('span'));
      this.button = this.node.appendChild(doc.createElement('button'));
      this.button.style.cssText = 'color: #fff; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1;';
      this.button.textContent = 'Stop';

      this.button.addEventListener('click', () => this.clicked());
      this.schedule();

      this.updateView();
      this.updateParcels();

      this.robotElt.addEventListener('transitionend', () => this.updateParcels());
    } // constructor

    updateView() {
      const pos = places[this.worldState.place];

      this.robotElt.style.top = (pos.y - 38) + 'px';
      this.robotElt.style.left = (pos.x - 16) + 'px';

      this.text.textContent = `Turn ${this.turn}`;
    } // updateView

    updateParcels() {
  
      while (this.parcels.length) this.parcels.pop().remove()
      let heights = {}
      for (let {place, address} of this.worldState.parcels) {
        let height = heights[place] || (heights[place] = 0)
        heights[place] += 14
        let node = document.createElement("div")
        let offset = placeKeys.indexOf(address) * 16
        node.style.cssText = "position: absolute; height: 16px; width: 16px; background-image: url(img/parcel2x.png); background-position: 0 -" + offset + "px";
        if (place == this.worldState.place) {
          node.style.left = "25px"
          node.style.bottom = (20 + height) + "px"
          this.robotElt.appendChild(node)
        } else {
          let pos = places[place]
          node.style.left = (pos.x - 5) + "px"
          node.style.top = (pos.y - 10 - height) + "px"
          this.node.appendChild(node)
        }
        this.parcels.push(node)
      }
    }// updateParcels

    tick() {
      let {direction, memory} = this.robot(this.worldState, this.robotState);
      this.worldState = this.worldState.move(direction);
      this.robotState = memory;
      this.turn += 1;
      this.updateView();

      if (!this.worldState.parcels.length) {
        this.button.remove();
        this.text.textContent =  `Finished after ${this.turn} turns`;
        this.robotElt.firstChild.src = 'img/robot_idle2x.png';
      } else {
        this.schedule();
      }
    } // tick

    schedule() {
      this.timeout = setTimeout(() => this.tick(), 1000/ speed);
    } // schedule

    clicked() {
      if (!this.timeout) {
        this.schedule();
        this.button.textContent = 'Stop';
        this.robotElt.firstChild.src = 'img/robot_moving2x.gif';
      } else {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.button.textContent = 'Start';
        this.robotElt.firstChild.src = 'img/robot_idel2x.png';
      }
    } // clicked
  };

  window.runRobotAnimation = function(worldState, robot, robotState) {
    if (active && active.timeout !== null) clearTimeout(active.timeout);

    active = new Animation(worldState, robot, robotState);
  };

  runRobotAnimation(VillageState.random(), goalOrientedRobot, []);
})();