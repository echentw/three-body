import * as React from 'react';

import { CheckBoxComponent } from '../CheckBoxComponent';

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
        <div className="text">{label}</div>
        <CheckBoxComponent
          checked={on}
          onToggle={onToggle}
        />
      </div>
    );
  }
}
