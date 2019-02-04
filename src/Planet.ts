import * as Konva from 'konva';
import { VisualizationFlags } from './main';

export type Vector = {
  x: number;
  y: number;
};

export type Point = Vector;
export type Velocity = Vector;
export type Acceleration = Vector;

export type PlanetProperties = {
  radius: number,
  mass: number,
}

export type PlanetInitialConditions = {
  position: Point;
  velocity: Velocity;
}

export type PlanetConfig = {
  properties: PlanetProperties,
  initialConditions: PlanetInitialConditions,
  flags: VisualizationFlags,
};

export class Planet {
  public radius: number;
  public mass: number;
  public position: Point;
  public velocity: Velocity;
  public acceleration: Acceleration;
  public flags: VisualizationFlags;

  constructor(config: PlanetConfig) {
    this.position = config.initialConditions.position;
    this.velocity = config.initialConditions.velocity;
    this.radius = config.properties.radius;
    this.mass = config.properties.mass;
    this.acceleration = { x: 0, y: 0 };
    this.flags = config.flags;
  }

  setInitialConditions(conditions: PlanetInitialConditions) {
    this.position = conditions.position;
    this.velocity = conditions.velocity;
  }

  setProperties(properties: PlanetProperties) {
    this.radius = properties.radius;
    this.mass = properties.mass;
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

  getKonvaPoop(): Konva.Group {
    const group = new Konva.Group();
    group.add(new Konva.Circle({
      x: this.position.x,
      y: this.position.y,
      radius: 1,
      fill: 'grey',
    }));
    return group;
  }

  getKonvaVelocityVector(): Konva.Group {
    const group = new Konva.Group();
    group.add(new Konva.Arrow({
      x: this.position.x,
      y: this.position.y,
      points: [0, 0, this.velocity.x * 2, this.velocity.y * 2],
      pointerLength: 8,
      pointerWidth : 6,
      fill: 'white',
      stroke: 'white',
      strokeWidth: 2,
    }));
    return group;
  }

  getKonvaAccelerationVector(): Konva.Group {
    const group = new Konva.Group();
    group.add(new Konva.Arrow({
      x: this.position.x,
      y: this.position.y,
      points: [0, 0, this.acceleration.x * 4, this.acceleration.y * 4],
      pointerLength: 8,
      pointerWidth : 6,
      fill: 'blue',
      stroke: 'blue',
      strokeWidth: 2,
    }));
    return group;
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
