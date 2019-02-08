import {
  Planet,
  PlanetConfig,
} from './Planet';
import { Vector } from './Physics';
import { VisualizationFlags } from './main';

export class ThreeBodySystem {
  private planets: Planet[];
  private momentumNormalized: boolean;

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

    this.momentumNormalized = false;
  }

  step(): void {
    this.planets.forEach(planet => {
      const otherPlanets = this.planets.filter(otherPlanet => otherPlanet !== planet);
      planet.update(otherPlanets);
    });

    if (this.momentumNormalized) {
      this.normalizeMomentum();
    }
  }

  updateFlags(planetId: number, flags: VisualizationFlags) {
    this.planets[planetId].setFlags(flags);
  }

  normalizeMomentum(): void {
    const systemMomentum = this.planets.reduce((momentum: Vector, planet: Planet) => ({
      x: momentum.x + (planet.mass * planet.velocity.x),
      y: momentum.y + (planet.mass * planet.velocity.y),
    }), { x: 0, y: 0 });

    const systemMass = this.planets.reduce((mass: number, planet: Planet) => mass + planet.mass, 0);

    const adjustment: Vector = {
      x: -systemMomentum.x / systemMass,
      y: -systemMomentum.y / systemMass,
    };

    this.planets.forEach(planet => {
      planet.velocity.x += adjustment.x;
      planet.velocity.y += adjustment.y;
    });

    this.momentumNormalized = true;
  }

  getPlanets(): Planet[] {
    return this.planets;
  }
}
