import * as React from 'react';

import './CheckBoxComponent.scss';

interface ComponentProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

export class CheckBoxComponent extends React.Component<ComponentProps> {
  onToggle = () => {
    this.props.onToggle(!this.props.checked);
  }

  render() {
    const { checked } = this.props;
    return (
      <div className="checkbox-component">
        <label className="container">
          <input
            type="checkbox"
            checked={checked}
            onChange={this.onToggle}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}
