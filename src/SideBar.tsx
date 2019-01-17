import * as React from 'react';
import * as ReactDOM from 'react-dom';

type CheckBoxProps = {
  onToggle: (checked: boolean) => void;
};

class CheckBox extends React.Component<CheckBoxProps> {
  state = {
    checked: false,
  }

  toggle = () => {
    const checked = !this.state.checked;
    this.setState({ checked });
    this.props.onToggle(checked);
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={this.toggle}
          />
        </label>
      </div>
    );
  }
}

class PlanetConfigComponent extends React.Component {
  state = {
    positionX: '100',
    positionY: '100',
    velocityX: '100',
    velocityY: '100',
    mass: 'mass',
    radius: 'radius',

    showVelocity: false,
    showAcceleration: false,
    tracePath: false,
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
  }

  onChangeShowAcceleration = (on: boolean) => {
    this.setState({ showAcceleration: on });
  }

  onChangeTracePath = (on: boolean) => {
    this.setState({ tracePath: on });
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
        </div>
        <div className="scalar-container">
          <div className="text">Radius:</div>
          <input className="scalar-input" type="text" value={this.state.mass} onChange={this.onChangeMass}/>
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
          <CheckBox onToggle={this.onChangeTracePath}/>
        </div>
      </div>
    );
  }
}

export class SideBarComponent extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <PlanetConfigComponent/>
        <PlanetConfigComponent/>
        <PlanetConfigComponent/>
      </div>
    );
  }
}
