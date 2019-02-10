import * as React from 'react';

import { CheckBoxComponent } from './CheckBoxComponent';

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
      <div className="global-config-component">
        <div className="global-flags-container">
          <div className="global-flag-container">
            <CheckBoxComponent
              checked={this.props.showAxis}
              onToggle={this.props.toggleAxis}
            />
            <div className="global-flag-label text">Show Axis</div>
          </div>
          <div className="global-flag-container">
            <CheckBoxComponent
              checked={this.props.normalized}
              onToggle={() => this.props.toggleNormalization(true)}
            />
            <div className="global-flag-label text">Normalize Momentum and Barycenter</div>
          </div>
        </div>
        <div className="global-buttons-container">
          <button onClick={() => this.props.togglePlayPause(!this.props.playing)}>
            { this.props.playing ? 'Pause' : 'Start' }
          </button>
          <button className="text" onClick={this.props.resetPositions}>
            Reset Positions
          </button>
        </div>
      </div>
    );
  }
}
