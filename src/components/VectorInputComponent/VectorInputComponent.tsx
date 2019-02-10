import * as React from 'react';

import './VectorInputComponent.scss';

interface ComponentProps {
  label: string;
  x: number;
  y: number;
  onChangeX: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeY: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class VectorInputComponent extends React.Component<ComponentProps> {
  render() {
    const { label, x, y, onChangeX, onChangeY } = this.props;
    return (
      <div className="vector-input-component">
        <div className="vector-label text">{label}:</div>
        <div className="left-parenthesis text">(</div>
        <input className="vector-input" type="text" defaultValue={String(x)} onChange={onChangeX}/>
        <div className="comma text">,</div>
        <input className="vector-input" type="text" defaultValue={String(y)} onChange={onChangeY}/>
        <div className="right-parenthesis text">)</div>
      </div>
    );
  }
}
