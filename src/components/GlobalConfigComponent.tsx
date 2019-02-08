import * as React from 'react';

import { CheckBox } from './CheckBox';

interface ComponentProps {
  togglePlayPause: (play: boolean) => void;
  toggleAxis: (on: boolean) => void;
  toggleNormalization: (normalized: boolean) => void;
  resetPositions: () => void;

  showAxis: boolean;
  playing: boolean;
  normalized: boolean;
}

export class GlobalConfigComponent extends React.Component<ComponentProps> {
  render() {
    return (
      <div className="global-config-container">
        <div className="flag-toggle">
          <div className="text">Show Axis</div>
          <CheckBox onToggle={this.props.toggleAxis}/>
        </div>
        <div className="buttons-container">
          <button onClick={() => this.props.togglePlayPause(!this.props.playing)}>
            { this.props.playing ? 'Pause' : 'Start' }
          </button>
          <button onClick={this.props.resetPositions}>
            Reset Positions
          </button>
        </div>
        <div className="normalize-container">
          <button
            onClick={() => this.props.toggleNormalization(true)}
            disabled={this.props.normalized}
          >
            { this.props.normalized ? 'Normalized!' : 'Normalize Momentum and Barycenter' }
          </button>
        </div>
      </div>
    );
  }
}
