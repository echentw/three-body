import {
  Planet,
  PlanetConfig,
} from './Planet';
import {
  Point,
  Vector,
} from './Physics';
import { VisualizationFlags } from './main';

export class ThreeBodySystem {
  private planets: Planet[];
  private normalized: boolean;

  constructor(configs: PlanetConfig[]) {
    this.reset(configs);
  }

  reset(configs: PlanetConfig[]) {
    const configsCopy = JSON.parse(JSON.stringify(configs)) as PlanetConfig[];
    this.planets = configsCopy.map(config => new Planet(config));
    this.planets.forEach(planet => {
      const others = this.planets.filter(other => other !== planet);
      planet.updateAcceleration(others);
    });

    this.normalized = false;
  }

  step(): void {
    this.planets.forEach(planet => {
      const otherPlanets = this.planets.filter(otherPlanet => otherPlanet !== planet);
      planet.update(otherPlanets);
    });

    if (this.normalized) {
      this.normalize();
    }
  }

  updateFlags(planetId: number, flags: VisualizationFlags) {
    this.planets[planetId].setFlags(flags);
  }

  normalize(): void {
    this.normalizeMomentum();
    this.normalizeBarycenter();

    this.normalized = true;
  }

  private getBarycenter(): Point {
    const weightedSystemMass = this.planets.reduce((center: Point, planet: Planet) => ({
      x: center.x + (planet.mass * planet.position.x),
      y: center.y + (planet.mass * planet.position.y),
    }), { x: 0, y: 0 });

    const systemMass = this.planets.reduce((mass: number, planet: Planet) => mass + planet.mass, 0);

    return {
      x: weightedSystemMass.x / systemMass,
      y: weightedSystemMass.y / systemMass,
    };
  }

  private getMomentum(): Vector {
    const systemMomentum = this.planets.reduce((momentum: Vector, planet: Planet) => ({
      x: momentum.x + (planet.mass * planet.velocity.x),
      y: momentum.y + (planet.mass * planet.velocity.y),
    }), { x: 0, y: 0 });

    const systemMass = this.planets.reduce((mass: number, planet: Planet) => mass + planet.mass, 0);

    return {
      x: systemMomentum.x / systemMass,
      y: systemMomentum.y / systemMass,
    };
  }

  private normalizeBarycenter(): void {
    const barycenter = this.getBarycenter();
    this.planets.forEach(planet => {
      planet.position.x -= barycenter.x;
      planet.position.y -= barycenter.y;
    });
  }

  private normalizeMomentum(): void {
    const momentum = this.getMomentum();
    this.planets.forEach(planet => {
      planet.velocity.x -= momentum.x;
      planet.velocity.y -= momentum.y;
    });
  }

  getPlanets(): Planet[] {
    return this.planets;
  }
}
