import { Simulator } from './Simulator';
import { Planet, PlanetConfig, Point, Velocity } from './Planet';

export type VisualizationFlags = {
  showVelocity: boolean;
  showAcceleration: boolean;
  showPath: boolean;
};

const planetConfigs: PlanetConfig[] = [
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
      showVelocity: false,
      showAcceleration: false,
      showPath: false,
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
      showVelocity: false,
      showAcceleration: false,
      showPath: false,
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
      showVelocity: false,
      showAcceleration: false,
      showPath: false,
    },
  },
];

const planets = planetConfigs.map(config => new Planet(config));
const simulator = new Simulator(planets);
simulator.draw();

function update() {
  // Update the representation of the planet objects.
  planets.forEach(planet => {
    const otherPlanets = planets.filter(otherPlanet => otherPlanet !== planet);
    planet.update(otherPlanets);
  });
}

function main() {
  update();
  simulator.draw();
  requestAnimationFrame(main);
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SideBarComponent } from './SideBar';
import './styles.scss';

class Controller extends React.Component {
  updateFlags = (planetId: number, flags: VisualizationFlags) => {
    planets[planetId].setFlags(flags);
    simulator.draw();
  }

  start = () => {
    main();
  }

  render() {
    return (
      <div className="controller">
        <SideBarComponent updateFlags={this.updateFlags} start={this.start}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Controller/>,
  document.getElementById("sidebar-container")
);
