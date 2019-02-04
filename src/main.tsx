import { Simulator } from './Simulator';
import {
  Planet,
  PlanetConfig,
  PlanetInitialConditions,
  PlanetProperties,
  Point,
  Velocity,
} from './Planet';
import { planetConfigs } from './initialConfig';

export type VisualizationFlags = {
  showVelocity: boolean;
  showAcceleration: boolean;
  showPath: boolean;
};

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

let STOPPED = false;
function main() {
  if (!STOPPED) {
    update();
    simulator.draw();
    requestAnimationFrame(main);
  }
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

  updatePlanetConfigs = (viewConfigs: PlanetConfig[]) => {
    const configs = JSON.parse(JSON.stringify(viewConfigs)) as PlanetConfig[];
    STOPPED = true;
    for (let i = 0; i < planets.length; ++i) {
      planets[i].setInitialConditions(configs[i].initialConditions);
      planets[i].setProperties(configs[i].properties);
      planets[i].setFlags(configs[i].flags);
    }
    simulator.draw();
  }

  toggleAxis = (on: boolean) => {
    simulator.toggleAxis(on);
  }

  start = () => {
    STOPPED = false;
    main();
  }

  render() {
    return (
      <div className="controller">
        <SideBarComponent
          updateFlags={this.updateFlags}
          updatePlanetConfigs={this.updatePlanetConfigs}
          toggleAxis={this.toggleAxis}
          start={this.start}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Controller/>,
  document.getElementById("sidebar-container")
);
