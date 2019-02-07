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

let planets: Planet[];
const simulator = new Simulator();

const initializeWorld = () => {
  const configsCopy = JSON.parse(JSON.stringify(planetConfigs)) as PlanetConfig[];
  planets = configsCopy.map(config => new Planet(config));
  planets.forEach(planet => {
    const others = planets.filter(other => other !== planet);
    planet.updateAcceleration(others);
  });

  simulator.attachPlanets(planets);
  simulator.clearPaths();
  simulator.draw();
};

initializeWorld();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SideBarComponent } from './components/SideBar';
import './styles.scss';

interface ComponentState {
  playing: boolean;
  showAxis: boolean;
}

class Controller extends React.Component<{}, ComponentState> {
  state = {
    playing: false,
    showAxis: true,
  }

  mainLoop = () => {
    if (this.state.playing) {
      this.updatePlanetStates();
      simulator.draw();
      requestAnimationFrame(this.mainLoop);
    }
  }

  updateFlags = (planetId: number, flags: VisualizationFlags) => {
    planets[planetId].setFlags(flags);
    simulator.draw();
  }

  updatePlanetStates = () => {
    planets.forEach(planet => {
      const otherPlanets = planets.filter(otherPlanet => otherPlanet !== planet);
      planet.update(otherPlanets);
    });
  }

  updatePlanetConfigs = (viewConfigs: PlanetConfig[]) => {
    const configs = JSON.parse(JSON.stringify(viewConfigs)) as PlanetConfig[];
    this.setState({ playing: false }, () => {
      for (let i = 0; i < planets.length; ++i) {
        planets[i].setInitialConditions(configs[i].initialConditions);
        planets[i].setProperties(configs[i].properties);
        planets[i].setFlags(configs[i].flags);
      }
      simulator.draw();
    });
  }

  toggleAxis = (showAxis: boolean) => {
    simulator.toggleAxis(showAxis);
    this.setState({ showAxis });
  }

  togglePlayPause = (playing: boolean) => {
    this.setState({ playing }, () => {
      if (this.state.playing) {
        this.mainLoop();
      }
    });
  }

  resetPositions = () => {
    this.setState({ playing: false }, () => {
      initializeWorld();
    });
  }

  render() {
    return (
      <div className="controller">
        <SideBarComponent
          updateFlags={this.updateFlags}
          updatePlanetConfigs={this.updatePlanetConfigs}
          toggleAxis={this.toggleAxis}
          togglePlayPause={this.togglePlayPause}
          resetPositions={this.resetPositions}
          playing={this.state.playing}
          showAxis={this.state.showAxis}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Controller/>,
  document.getElementById("sidebar-container")
);
