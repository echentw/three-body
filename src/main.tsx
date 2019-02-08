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

const initializeWorld = (configs: PlanetConfig[]) => {
  system.reset(configs);
  simulator.clearPaths();
  simulator.draw();
};

initializeWorld(planetConfigs);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SideBarComponent } from './components/SideBar';
import './styles.scss';

interface ComponentState {
  playing: boolean;
  showAxis: boolean;
  momentumNormalized: boolean;
}

class Controller extends React.Component<{}, ComponentState> {
  state = {
    playing: false,
    showAxis: true,
    momentumNormalized: false,
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
    this.setState({ playing: false, momentumNormalized: false }, () => {
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

  toggleMomentumNormalization = (normalized: boolean) => {
    this.setState({ momentumNormalized: normalized }, () => {
      if (this.state.momentumNormalized) {
        system.normalizeMomentum();
      }
    });
  }

  resetPositions = () => {
    this.setState({ playing: false, momentumNormalized: false }, () => {
      initializeWorld(planetConfigs);
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
          toggleMomentumNormalization={this.toggleMomentumNormalization}
          resetPositions={this.resetPositions}
          playing={this.state.playing}
          showAxis={this.state.showAxis}
          momentumNormalized={this.state.momentumNormalized}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Controller/>,
  document.getElementById("sidebar-container")
);
