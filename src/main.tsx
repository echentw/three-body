import { Simulator } from './Simulator';
import {
  Planet,
  PlanetConfig,
  PlanetInitialConditions,
  PlanetProperties,
} from './Planet';
import { Point, Velocity } from './Physics';
import { ThreeBodySystem } from './ThreeBodySystem';
import { planetConfigs } from './initialConfig';

export type VisualizationFlags = {
  showVelocity: boolean;
  showAcceleration: boolean;
  showPath: boolean;
};

const system = new ThreeBodySystem(planetConfigs);
const simulator = new Simulator(system);
simulator.toggleAxis(true); // show axis

const initializeWorld = (configs: PlanetConfig[]) => {
  system.reset(configs);
  simulator.clearPaths();
  simulator.draw();
};

initializeWorld(planetConfigs);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SideBarComponent } from './components/SideBarComponent';
import './styles/main.scss';

interface ComponentState {
  playing: boolean;
  showAxis: boolean;
  normalized: boolean;
}

class Controller extends React.Component<{}, ComponentState> {
  state = {
    playing: false,
    showAxis: true,
    normalized: false,
  }

  mainLoop = () => {
    if (this.state.playing) {
      this.updatePlanetStates();
      simulator.draw();
      requestAnimationFrame(this.mainLoop);
    }
  }

  updateFlags = (planetId: number, flags: VisualizationFlags) => {
    system.updateFlags(planetId, flags);
    simulator.draw();
  }

  updatePlanetStates = () => {
    system.step();
  }

  updatePlanetConfigs = (viewConfigs: PlanetConfig[]) => {
    this.setState({ playing: false, normalized: false }, () => {
      initializeWorld(viewConfigs);
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

  toggleNormalization = (normalized: boolean) => {
    this.setState({ normalized }, () => {
      if (this.state.normalized) {
        system.normalize();
        simulator.draw();
      }
    });
  }

  resetPositions = () => {
    this.setState({ playing: false, normalized: false }, () => {
      initializeWorld(planetConfigs);
    });
  }

  render() {
    return (
      <SideBarComponent
        updateFlags={this.updateFlags}
        updatePlanetConfigs={this.updatePlanetConfigs}
        toggleAxis={this.toggleAxis}
        togglePlayPause={this.togglePlayPause}
        toggleNormalization={this.toggleNormalization}
        resetPositions={this.resetPositions}
        playing={this.state.playing}
        showAxis={this.state.showAxis}
        normalized={this.state.normalized}
      />
    );
  }
}

ReactDOM.render(
  <Controller/>,
  document.getElementById("sidebar-root")
);
