import * as React from 'react';

import { CheckBox } from './CheckBox';
import { PlanetConfig } from '../Planet';

interface ComponentProps {
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

export class PlanetConfigComponent extends React.Component<ComponentProps> {
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
          <input className="vector-input" type="text" defaultValue={String(initialConditions.position.x)} onChange={onChangePositionX}/>
          ,
          <input className="vector-input" type="text" defaultValue={String(initialConditions.position.y)} onChange={onChangePositionY}/>
          )
        </div>
        <div className="initial-vector">
          <div className="text">Initial Velocity:</div>
          (
          <input className="vector-input" type="text" defaultValue={String(initialConditions.velocity.x)} onChange={onChangeVelocityX}/>
          ,
          <input className="vector-input" type="text" defaultValue={String(initialConditions.velocity.y)} onChange={onChangeVelocityY}/>
          )
        </div>
        <div className="scalar-container">
          <div className="text">Mass:</div>
          <input className="scalar-input" type="text" defaultValue={String(properties.mass)} onChange={onChangeMass}/>
          kg
        </div>
        <div className="scalar-container">
          <div className="text">Radius:</div>
          <input className="scalar-input" type="text" defaultValue={String(properties.radius)} onChange={onChangeRadius}/>
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
