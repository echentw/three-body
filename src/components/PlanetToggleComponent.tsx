import * as React from 'react';

import { CheckBox } from './CheckBox';

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
        <CheckBox onToggle={onToggle}/>
      </div>
    );
  }
}
