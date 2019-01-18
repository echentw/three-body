import * as React from 'react';

import { VisualizationFlags } from './main';
import { CheckBox } from './CheckBox';
import { PlanetConfig, PlanetProperties, PlanetInitialConditions } from './Planet';

interface PlanetConfigComponentProps {
  config: PlanetConfig,
  onChangePositionX: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePositionY: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeVelocityX: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeVelocityY: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMass: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRadius: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeShowVelocity: (on: boolean) => void;
  onChangeShowAcceleration: (on: boolean) => void;
  onChangeShowPath: (on: boolean) => void;
}

class PlanetConfigComponent extends React.Component<PlanetConfigComponentProps> {
  render() {
    const { properties, initialConditions, flags } = this.props.config;
    const {
      onChangePositionX,
      onChangePositionY,
      onChangeVelocityX,
      onChangeVelocityY,
      onChangeMass,
      onChangeRadius,
      onChangeShowVelocity,
      onChangeShowAcceleration,
      onChangeShowPath,
    } = this.props;
    return (
      <div className="planet-config-component">
        <div className="initial-vector">
          <div className="text">Initial Position:</div>
          (
          <input className="vector-input" type="text" value={initialConditions.position.x} onChange={onChangePositionX}/>
          ,
          <input className="vector-input" type="text" value={initialConditions.position.y} onChange={onChangePositionY}/>
          )
        </div>
        <div className="initial-vector">
          <div className="text">Initial Velocity:</div>
          (
          <input className="vector-input" type="text" value={initialConditions.velocity.x} onChange={onChangeVelocityX}/>
          ,
          <input className="vector-input" type="text" value={initialConditions.velocity.y} onChange={onChangeVelocityY}/>
          )
        </div>
        <div className="scalar-container">
          <div className="text">Mass:</div>
          <input className="scalar-input" type="text" value={properties.mass} onChange={onChangeMass}/>
          kg
        </div>
        <div className="scalar-container">
          <div className="text">Radius:</div>
          <input className="scalar-input" type="text" value={properties.radius} onChange={onChangeRadius}/>
          m
        </div>

        <div className="flag-toggle">
          <div className="text">Show Velocity</div>
          <CheckBox onToggle={onChangeShowVelocity}/>
        </div>
        <div className="flag-toggle">
          <div className="text">Show Acceleration</div>
          <CheckBox onToggle={onChangeShowAcceleration}/>
        </div>
        <div className="flag-toggle">
          <div className="text">Trace Path</div>
          <CheckBox onToggle={onChangeShowPath}/>
        </div>
      </div>
    );
  }
}

interface SideBarComponentProps {
  updateFlags: (planetId: number, flags: VisualizationFlags) => void;
  updatePlanetConfigs: (configs: PlanetConfig[]) => void;
  start: () => void;
}

interface SideBarComponentState {
  configs: PlanetConfig[],
}

export class SideBarComponent extends React.Component<SideBarComponentProps, SideBarComponentState> {
  state = {
    configs: [{
      initialConditions: {
        position: {
          x: 300.0,
          y: 300.0,
        },
        velocity: {
          x: -2.0,
          y: -1.0,
        },
      },
      properties: {
        radius: 10.0,
        mass: 1.0,
      },
      flags: {
        showVelocity: false,
        showAcceleration: false,
        showPath: false,
      },
    }, {
      initialConditions: {
        position: {
          x: 400.0,
          y: 300.0,
        },
        velocity: {
          x: 0.0,
          y: 20.0,
        },
      },
      properties: {
        radius: 20.0,
        mass: 10.0,
      },
      flags: {
        showVelocity: false,
        showAcceleration: false,
        showPath: false,
      },
    }, {
      initialConditions: {
        position: {
          x: 600.0,
          y: 300.0,
        },
        velocity: {
          x: 0.0,
          y: -20.0,
        },
      },
      properties: {
        radius: 20.0,
        mass: 10.0,
      },
      flags: {
        showVelocity: false,
        showAcceleration: false,
        showPath: false,
      },
    }],
  };

  onChangePositionX = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.position.x = Number(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangePositionY = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.position.y = Number(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeVelocityX = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.velocity.x = Number(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeVelocityY = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.velocity.y = Number(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeMass = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].properties.mass = Number(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeRadius = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].properties.radius = Number(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeShowVelocity = (planetId: number, on: boolean) => {
    const configs = this.state.configs;
    configs[planetId].flags.showVelocity = on;
    this.setState({ configs });

    this.props.updateFlags(planetId, configs[planetId].flags);
  }

  onChangeShowAcceleration = (planetId: number, on: boolean) => {
    const configs = this.state.configs;
    configs[planetId].flags.showAcceleration = on;
    this.setState({ configs });

    this.props.updateFlags(planetId, configs[planetId].flags);
  }

  onChangeShowPath = (planetId: number, on: boolean) => {
    const configs = this.state.configs;
    configs[planetId].flags.showPath = on;
    this.setState({ configs });

    this.props.updateFlags(planetId, configs[planetId].flags);
  }

  render() {
    return (
      <div className="sidebar">
        <PlanetConfigComponent
          config={this.state.configs[0]}
          onChangePositionX={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePositionX(0, event)}
          onChangePositionY={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePositionY(0, event)}
          onChangeVelocityX={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeVelocityX(0, event)}
          onChangeVelocityY={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeVelocityY(0, event)}
          onChangeMass={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeMass(0, event)}
          onChangeRadius={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeRadius(0, event)}
          onChangeShowVelocity={(on: boolean) => this.onChangeShowVelocity(0, on)}
          onChangeShowAcceleration={(on: boolean) => this.onChangeShowAcceleration(0, on)}
          onChangeShowPath={(on: boolean) => this.onChangeShowPath(0, on)}
        />
        <PlanetConfigComponent
          config={this.state.configs[1]}
          onChangePositionX={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePositionX(1, event)}
          onChangePositionY={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePositionY(1, event)}
          onChangeVelocityX={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeVelocityX(1, event)}
          onChangeVelocityY={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeVelocityY(1, event)}
          onChangeMass={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeMass(1, event)}
          onChangeRadius={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeRadius(1, event)}
          onChangeShowVelocity={(on: boolean) => this.onChangeShowVelocity(1, on)}
          onChangeShowAcceleration={(on: boolean) => this.onChangeShowAcceleration(1, on)}
          onChangeShowPath={(on: boolean) => this.onChangeShowPath(1, on)}
        />
        <PlanetConfigComponent
          config={this.state.configs[2]}
          onChangePositionX={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePositionX(2, event)}
          onChangePositionY={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePositionY(2, event)}
          onChangeVelocityX={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeVelocityX(2, event)}
          onChangeVelocityY={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeVelocityY(2, event)}
          onChangeMass={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeMass(2, event)}
          onChangeRadius={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeRadius(2, event)}
          onChangeShowVelocity={(on: boolean) => this.onChangeShowVelocity(2, on)}
          onChangeShowAcceleration={(on: boolean) => this.onChangeShowAcceleration(2, on)}
          onChangeShowPath={(on: boolean) => this.onChangeShowPath(2, on)}
        />
        <button onClick={this.props.start}>
          Activate Lasers
        </button>
      </div>
    );
  }
}
