import * as Konva from 'konva';

type VisualizationFlags = {
  showVelocity: boolean;
  showAcceleration: boolean;
  showPath: boolean;
};

type PlanetConfig = {
  radius: number,
  mass: number,
  position: Point,
  velocity: Velocity,
  flags: VisualizationFlags,
};

const defaultPlanetConfigs: PlanetConfig[] = [
  {
    radius: 10.0,
    mass: 1.0,
    position: {
      x: 300.0,
      y: 300.0,
    },
    velocity: {
      x: -2.0,
      y: -1.0,
    },
    flags: {
      showVelocity: true,
      showAcceleration: true,
      showPath: true,
    },
  }, {
    radius: 20.0,
    mass: 10.0,
    position: {
      x: 400.0,
      y: 300.0,
    },
    velocity: {
      x: 0.0,
      y: 20.0,
    },
    flags: {
      showVelocity: true,
      showAcceleration: true,
      showPath: true,
    },
  }, {
    radius: 20.0,
    mass: 10.0,
    position: {
      x: 600.0,
      y: 300.0,
    },
    velocity: {
      x: 0.0,
      y: -20.0,
    },
    flags: {
      showVelocity: true,
      showAcceleration: true,
      showPath: true,
    },
  },
];

type Vector = {
  x: number;
  y: number;
};

type Point = Vector;
type Velocity = Vector;
type Acceleration = Vector;

type PlanetSpecs = {
  radius: number;
  mass: number;
  position: Point;
  velocity: Velocity;
};

class Planet {
  public readonly radius: number;
  public readonly mass: number;
  public position: Point;
  public velocity: Velocity;
  public acceleration: Acceleration;
  public flags: VisualizationFlags;

  constructor(config: PlanetConfig) {
    this.position = config.position;
    this.radius = config.radius;
    this.mass = config.mass;
    this.velocity = config.velocity;
    this.acceleration = { x: 0, y: 0 };
    this.flags = config.flags;
  }

  setFlags(flags: VisualizationFlags) {
    this.flags = flags;
  }

  // Updates this planet's position given the other planets' positions and masses.
  update(planets: Planet[]) {
    const netForce: Vector = { x: 0, y: 0 };

    planets.forEach(planet => {
      const G = 1.0;
      const distance = Math.sqrt(
        Math.pow(this.position.x - planet.position.x, 2) + Math.pow(this.position.y - planet.position.y, 2)
      );
      const force = G * this.mass * planet.mass / distance * distance;
      const direction: Vector = {
        x: (planet.position.x - this.position.x) / distance,
        y: (planet.position.y - this.position.y) / distance,
      };

      netForce.x += force * direction.x;
      netForce.y += force * direction.y;
    });

    const netAcceleration: Acceleration = {
      x: netForce.x / this.mass,
      y: netForce.y / this.mass,
    };

    const dt = 0.1;

    this.acceleration = netAcceleration;

    this.velocity.x += netAcceleration.x * dt;
    this.velocity.y += netAcceleration.y * dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  getKonvaPoop(): Konva.Shape {
    return new Konva.Circle({
      x: this.position.x,
      y: this.position.y,
      radius: 1,
      fill: 'grey',
    });
  }

  getKonvaVelocityVector(): Konva.Shape {
    return new Konva.Arrow({
      x: this.position.x,
      y: this.position.y,
      points: [0, 0, this.velocity.x * 2, this.velocity.y * 2],
      pointerLength: 8,
      pointerWidth : 6,
      fill: 'white',
      stroke: 'white',
      strokeWidth: 2,
    });
  }

  getKonvaAccelerationVector(): Konva.Shape {
    return new Konva.Arrow({
      x: this.position.x,
      y: this.position.y,
      points: [0, 0, this.acceleration.x * 4, this.acceleration.y * 4],
      pointerLength: 8,
      pointerWidth : 6,
      fill: 'blue',
      stroke: 'blue',
      strokeWidth: 2,
    });
  }

  getKonvaGroup(): Konva.Group {
    const group = new Konva.Group();
    group.add(new Konva.Circle({
      fill: 'green',
      radius: this.radius,
      x: this.position.x,
      y: this.position.y,
    }));
    return group;
  }
}

function main() {
  const stage = new Konva.Stage({
    container: 'canvas',
    width: 1000,
    height: 700,
  });

  const backgroundLayer = new Konva.Layer();
  const mainLayer = new Konva.Layer();
  const pathsLayer = new Konva.Layer();
  const vectorsLayer = new Konva.Layer();

  backgroundLayer.add(new Konva.Rect({
    width: stage.getWidth(),
    height: stage.getHeight(),
    fill: 'black',
  }));

  stage.add(backgroundLayer);
  stage.add(pathsLayer);
  stage.add(mainLayer);
  stage.add(vectorsLayer);

  backgroundLayer.draw();

  const planets = defaultPlanetConfigs.map(config => new Planet(config));

  function update() {
    // Update the representation of the planet objects.
    planets.forEach(planet => {
      const otherPlanets = planets.filter(otherPlanet => otherPlanet !== planet);
      planet.update(otherPlanets);
    });

    // Clear the canvas
    mainLayer.removeChildren();
    vectorsLayer.removeChildren();

    planets.forEach(planet => mainLayer.add(planet.getKonvaGroup()));

    // Optional flags
    planets.filter(planet => planet.flags.showPath).forEach(planet => {
      const poop = planet.getKonvaPoop();
      pathsLayer.add(poop);
      poop.draw();
    });
    planets.filter(planet => planet.flags.showVelocity).forEach(planet => {
      vectorsLayer.add(planet.getKonvaVelocityVector());
    });
    planets.filter(planet => planet.flags.showAcceleration).forEach(planet => {
      vectorsLayer.add(planet.getKonvaAccelerationVector());
    });

    // Redraw
    mainLayer.draw();
    vectorsLayer.draw();

    requestAnimationFrame(update);
  }

  update();
}

main();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.scss';

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        hello
      </div>
    );
  }
}

ReactDOM.render(
  <SideBar/>,
  document.getElementById("sidebar")
);
