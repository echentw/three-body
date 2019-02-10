import * as React from 'react';

import { CheckBoxComponent } from '../CheckBoxComponent/CheckBoxComponent';

import './PlanetToggleComponent.scss';

interface ComponentProps {
  label: string;
  on: boolean;
  onToggle: (on: boolean) => void;
}

export class PlanetToggleComponent extends React.Component<ComponentProps> {
  render() {
    const { label, on, onToggle } = this.props;
    return (
      <div className="planet-toggle-component">
        <div className="planet-toggle-label text">{label}</div>
        <CheckBoxComponent
          checked={on}
          onToggle={onToggle}
        />
      </div>
    );
  }
}
