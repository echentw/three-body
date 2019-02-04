import { PlanetConfig } from './Planet';

export const planetConfigs: PlanetConfig[] = [
  {
    initialConditions: {
      position: {
        x: -200.0,
        y: 0.0,
      },
      velocity: {
        x: -2.0,
        y: -1.0,
      },
    },
    properties: {
      radius: 10.0,
      mass: 1.0,
    },
    flags: {
      showVelocity: false,
      showAcceleration: false,
      showPath: false,
    },
  }, {
    initialConditions: {
      position: {
        x: -100.0,
        y: -50.0,
      },
      velocity: {
        x: 0.0,
        y: 20.0,
      },
    },
    properties: {
      radius: 20.0,
      mass: 10.0,
    },
    flags: {
      showVelocity: false,
      showAcceleration: false,
      showPath: false,
    },
  }, {
    initialConditions: {
      position: {
        x: 100.0,
        y: 0.0,
      },
      velocity: {
        x: 0.0,
        y: -20.0,
      },
    },
    properties: {
      radius: 20.0,
      mass: 10.0,
    },
    flags: {
      showVelocity: false,
      showAcceleration: false,
      showPath: false,
    },
  },
];
