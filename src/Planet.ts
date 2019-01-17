import * as Konva from 'konva';
import { VisualizationFlags } from './main';

export type Vector = {
  x: number;
  y: number;
};

export type Point = Vector;
export type Velocity = Vector;
export type Acceleration = Vector;

export type PlanetConfig = {
  radius: number,
  mass: number,
  position: Point,
  velocity: Velocity,
  flags: VisualizationFlags,
};

export class Planet {
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
