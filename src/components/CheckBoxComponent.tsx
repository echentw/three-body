import * as React from 'react';

interface ComponentProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

export class CheckBoxComponent extends React.Component<ComponentProps> {
  onToggle = () => {
    this.props.onToggle(!this.props.checked);
  }

  render() {
    const { checked, onToggle } = this.props;
    return (
      <div className="checkbox-component">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={this.onToggle}
          />
        </label>
      </div>
    );
  }
}
