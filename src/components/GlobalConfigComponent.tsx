import * as React from 'react';

import { CheckBox } from './CheckBox';

interface ComponentProps {
  togglePlayPause: (play: boolean) => void;
  toggleAxis: (on: boolean) => void;

  showAxis: boolean;
  playing: boolean;
}

export class GlobalConfigComponent extends React.Component<ComponentProps> {
  render() {
    return (
      <div className="global-config-container">
        <div className="flag-toggle">
          <div className="text">Show Axis</div>
          <CheckBox onToggle={this.props.toggleAxis}/>
        </div>
        <button onClick={() => this.props.togglePlayPause(!this.props.playing)}>
          { this.props.playing ? 'Pause' : 'Start' }
        </button>
      </div>
    );
  }
}
