import * as React from 'react';

import { VisualizationFlags } from './main';
import { CheckBox } from './CheckBox';

interface PlanetConfigComponentProps {
  updateFlags: (flags: VisualizationFlags) => void;
}

class PlanetConfigComponent extends React.Component<PlanetConfigComponentProps> {
  state = {
    positionX: '100',
    positionY: '100',
    velocityX: '100',
    velocityY: '100',
    mass: 'mass',
    radius: 'radius',

    showVelocity: false,
    showAcceleration: false,
    showPath: false,
  }

  onChangePositionX = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ positionX: event.target.value });
  }

  onChangePositionY = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ positionY: event.target.value });
  }

  onChangeVelocityX = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ velocityX: event.target.value });
  }

  onChangeVelocityY = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ velocityY: event.target.value });
  }

  onChangeMass = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ mass: event.target.value });
  }

  onChangeRadius = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ radius: event.target.value });
  }

  onChangeShowVelocity = (on: boolean) => {
    this.setState({ showVelocity: on });
    this.props.updateFlags({
      showVelocity: on,
      showAcceleration: this.state.showAcceleration,
      showPath: this.state.showPath,
    });
  }

  onChangeShowAcceleration = (on: boolean) => {
    this.setState({ showAcceleration: on });
    this.props.updateFlags({
      showVelocity: this.state.showVelocity,
      showAcceleration: on,
      showPath: this.state.showPath,
    });
  }

  onChangeShowPath = (on: boolean) => {
    this.setState({ showPath: on });
    this.props.updateFlags({
      showVelocity: this.state.showVelocity,
      showAcceleration: this.state.showAcceleration,
      showPath: on,
    });
  }

  render() {
    return (
      <div className="planet-config-component">
        <div className="initial-vector">
          <div className="text">Initial Position:</div>
          (
          <input className="vector-input" type="text" value={this.state.positionX} onChange={this.onChangePositionX}/>
          ,
          <input className="vector-input" type="text" value={this.state.positionY} onChange={this.onChangePositionY}/>
          )
        </div>
        <div className="initial-vector">
          <div className="text">Initial Velocity:</div>
          (
          <input className="vector-input" type="text" value={this.state.velocityX} onChange={this.onChangeVelocityX}/>
          ,
          <input className="vector-input" type="text" value={this.state.velocityY} onChange={this.onChangeVelocityY}/>
          )
        </div>
        <div className="scalar-container">
          <div className="text">Mass:</div>
          <input className="scalar-input" type="text" value={this.state.mass} onChange={this.onChangeMass}/>
          kg
        </div>
        <div className="scalar-container">
          <div className="text">Radius:</div>
          <input className="scalar-input" type="text" value={this.state.mass} onChange={this.onChangeMass}/>
          m
        </div>

        <div className="flag-toggle">
          <div className="text">Show Velocity</div>
          <CheckBox onToggle={this.onChangeShowVelocity}/>
        </div>
        <div className="flag-toggle">
          <div className="text">Show Acceleration</div>
          <CheckBox onToggle={this.onChangeShowAcceleration}/>
        </div>
        <div className="flag-toggle">
          <div className="text">Trace Path</div>
          <CheckBox onToggle={this.onChangeShowPath}/>
        </div>
      </div>
    );
  }
}

interface SideBarComponentProps {
  updateFlags: (planetId: number, flags: VisualizationFlags) => void;
  start: () => void;
}

export class SideBarComponent extends React.Component<SideBarComponentProps> {
  render() {
    return (
      <div className="sidebar">
        <PlanetConfigComponent updateFlags={(flags: VisualizationFlags) => this.props.updateFlags(0, flags)}/>
        <PlanetConfigComponent updateFlags={(flags: VisualizationFlags) => this.props.updateFlags(1, flags)}/>
        <PlanetConfigComponent updateFlags={(flags: VisualizationFlags) => this.props.updateFlags(2, flags)}/>
        <button onClick={this.props.start}>
          Activate Lasers
        </button>
      </div>
    );
  }
}
