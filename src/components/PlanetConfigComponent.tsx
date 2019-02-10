import * as React from 'react';

import { PlanetConfig } from '../Planet';
import { VectorInputComponent } from './VectorInputComponent/VectorInputComponent';
import { ScalarInputComponent } from './ScalarInputComponent/ScalarInputComponent';
import { PlanetToggleComponent } from './PlanetToggleComponent/PlanetToggleComponent';

interface ComponentProps {
  label: string;
  config: PlanetConfig;
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
      label,
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
        <div className="planet-name text">
          {label}
        </div>
        <div className="inputs-container">
          <div className="vector-inputs-container">
            <div className="vector-input-container">
              <VectorInputComponent
                label={"Initial Position"}
                x={initialConditions.position.x}
                y={initialConditions.position.y}
                onChangeX={onChangePositionX}
                onChangeY={onChangePositionY}
              />
            </div>
            <div className="vector-input-container">
              <VectorInputComponent
                label={"Initial Velocity"}
                x={initialConditions.velocity.x}
                y={initialConditions.velocity.y}
                onChangeX={onChangeVelocityX}
                onChangeY={onChangeVelocityY}
              />
            </div>
          </div>
          <div className="scalar-inputs-container">
            <div className="scalar-input-container">
              <ScalarInputComponent
                label={"Mass"}
                value={properties.mass}
                onChangeValue={onChangeMass}
              />
            </div>
            <div className="scalar-input-container">
              <ScalarInputComponent
                label={"Radius"}
                value={properties.radius}
                onChangeValue={onChangeRadius}
              />
            </div>
          </div>
        </div>
        <div className="planet-toggles-container">
          <div className="planet-toggle-container">
            <PlanetToggleComponent
              label={"Show Velocity"}
              on={flags.showVelocity}
              onToggle={onChangeShowVelocity}
            />
          </div>
          <div className="planet-toggle-container">
            <PlanetToggleComponent
              label={"Show Acceleration"}
              on={flags.showAcceleration}
              onToggle={onChangeShowAcceleration}
            />
          </div>
          <div className="planet-toggle-container">
            <PlanetToggleComponent
              label={"Trace Path"}
              on={flags.showPath}
              onToggle={onChangeShowPath}
            />
          </div>
        </div>
      </div>
    );
  }
}
