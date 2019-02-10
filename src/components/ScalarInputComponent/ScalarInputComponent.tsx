import * as React from 'react';

import './ScalarInputComponent.scss';

interface ComponentProps {
  label: string;
  value: number;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class ScalarInputComponent extends React.Component<ComponentProps> {
  render() {
    const { label, value, onChangeValue } = this.props;
    return (
      <div className="scalar-input-component">
        <div className="scalar-label text">{label}:</div>
        <input className="scalar-input" type="text" defaultValue={String(value)} onChange={onChangeValue}/>
      </div>
    );
  }
}
