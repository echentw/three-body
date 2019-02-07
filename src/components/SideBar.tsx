import * as React from 'react';

import { VisualizationFlags } from '../main';
import { PlanetConfig } from '../Planet';
import { planetConfigs } from '../initialConfig';
import { PlanetConfigComponent } from './PlanetConfigComponent';
import { GlobalConfigComponent } from './GlobalConfigComponent';

interface SideBarComponentProps {
  updateFlags: (planetId: number, flags: VisualizationFlags) => void;
  updatePlanetConfigs: (configs: PlanetConfig[]) => void;
  toggleAxis: (showAxis: boolean) => void;
  togglePlayPause: (playing: boolean) => void;

  playing: boolean;
  showAxis: boolean;
}

interface SideBarComponentState {
  configs: PlanetConfig[],
}

export class SideBarComponent extends React.Component<SideBarComponentProps, SideBarComponentState> {
  state = {
    configs: planetConfigs,
  };

  numberOrZero = (value: string): number => {
    const maybeFloat = Number(value);
    return isNaN(maybeFloat) ? 0.0 : maybeFloat;
  }

  onChangePositionX = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.position.x = this.numberOrZero(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangePositionY = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.position.y = this.numberOrZero(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeVelocityX = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.velocity.x = this.numberOrZero(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeVelocityY = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].initialConditions.velocity.y = this.numberOrZero(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeMass = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].properties.mass = this.numberOrZero(event.target.value);
    this.setState({ configs });

    this.props.updatePlanetConfigs(configs);
  }

  onChangeRadius = (planetId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const configs = this.state.configs;
    configs[planetId].properties.radius = this.numberOrZero(event.target.value);
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
        <GlobalConfigComponent
          togglePlayPause={this.props.togglePlayPause}
          toggleAxis={this.props.toggleAxis}
          showAxis={this.props.showAxis}
          playing={this.props.playing}
        />
      </div>
    );
  }
}
