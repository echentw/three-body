import * as React from 'react';

import { CheckBox } from './CheckBox';
import { PlanetConfig } from '../Planet';
import { VectorInputComponent } from './VectorInputComponent';
import { ScalarInputComponent } from './ScalarInputComponent';
import { PlanetToggleComponent } from './PlanetToggleComponent';

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
        <VectorInputComponent
          label={"Initial Position"}
          x={initialConditions.position.x}
          y={initialConditions.position.y}
          onChangeX={onChangePositionX}
          onChangeY={onChangePositionY}
        />
        <VectorInputComponent
          label={"Initial Velocity"}
          x={initialConditions.velocity.x}
          y={initialConditions.velocity.y}
          onChangeX={onChangeVelocityX}
          onChangeY={onChangeVelocityY}
        />
        <ScalarInputComponent
          label={"Mass"}
          value={properties.mass}
          onChangeValue={onChangeMass}
        />
        <ScalarInputComponent
          label={"Radius"}
          value={properties.radius}
          onChangeValue={onChangeRadius}
        />
        <PlanetToggleComponent
          label={"Show Velocity"}
          on={false}
          onToggle={onChangeShowVelocity}
        />
        <PlanetToggleComponent
          label={"Show Acceleration"}
          on={false}
          onToggle={onChangeShowAcceleration}
        />
        <PlanetToggleComponent
          label={"Trace Path"}
          on={false}
          onToggle={onChangeShowPath}
        />
      </div>
    );
  }
}
