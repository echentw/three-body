import * as Konva from 'konva';

const flags = {
  showVelocities: true,
  showAccelerations: true,
  tracePaths: false,
};

type Vector = {
  x: number;
  y: number;
};

type Point = Vector;
type Velocity = Vector;

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

  constructor(specs: PlanetSpecs) {
    this.position = specs.position;
    this.radius = specs.radius;
    this.mass = specs.mass;
    this.velocity = specs.velocity;
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

    const netAcceleration: Vector = {
      x: netForce.x / this.mass,
      y: netForce.y / this.mass,
    };

    const dt = 0.1;

    this.velocity.x += netAcceleration.x * dt;
    this.velocity.y += netAcceleration.y * dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  drawVelocityVector() {
  }

  drawAccelerationVector() {
  }

  getGroup() {
    if (flags.showVelocities) {
      this.drawVelocityVector();
    }

    if (flags.showAccelerations) {
      this.drawAccelerationVector();
    }

    const shape = new Konva.Circle({
      fill: 'green',
      radius: this.radius,
      x: this.position.x,
      y: this.position.y,
    });

    return shape;
  }
}

function main() {
  const planet = new Planet({
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
  });

  const planet2 = new Planet({
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
  });

  const planet3 = new Planet({
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
  });

  const stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 600,
  });

  const backgroundLayer = new Konva.Layer();
  backgroundLayer.add(new Konva.Rect({
    width: 1000,
    height: 600,
    fill: 'black',
  }));

  const layer = new Konva.Layer();

  function update() {
    planet.update([planet2, planet3]);
    planet2.update([planet, planet3]);
    planet3.update([planet, planet2]);

    stage.removeChildren();
    layer.removeChildren();

    stage.add(backgroundLayer);

    layer.add(planet.getGroup());
    layer.add(planet2.getGroup());
    layer.add(planet3.getGroup());

    stage.add(layer);

    requestAnimationFrame(update);
  }

  update();
}

main();
