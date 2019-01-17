import * as React from 'react';

type CheckBoxProps = {
  onToggle: (checked: boolean) => void;
};

export class CheckBox extends React.Component<CheckBoxProps> {
  state = {
    checked: false,
  }

  toggle = () => {
    const checked = !this.state.checked;
    this.setState({ checked });
    this.props.onToggle(checked);
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={this.toggle}
          />
        </label>
      </div>
    );
  }
}
