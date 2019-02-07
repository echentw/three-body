import * as Konva from 'konva';
import { Planet } from './Planet';
import { Axis } from './Axis';

export class Simulator {
  private planets: Planet[];
  private axis: Axis;

  private stage: Konva.Stage;
  private backgroundLayer: Konva.Layer;
  private axisLayer: Konva.Layer;
  private pathsLayer: Konva.Layer;
  private mainLayer: Konva.Layer;
  private vectorsLayer: Konva.Layer;

  constructor() {
    this.stage = new Konva.Stage({
      container: 'canvas',
      width: 1000,
      height: 700,
    });
    this.axis = new Axis(
      { width: this.stage.getWidth(), height: this.stage.getHeight() },
      { x: this.stage.getWidth() / 2, y: this.stage.getHeight() / 2 },
    );

    this.backgroundLayer = new Konva.Layer();
    this.axisLayer = new Konva.Layer();
    this.pathsLayer = new Konva.Layer();
    this.mainLayer = new Konva.Layer();
    this.vectorsLayer = new Konva.Layer();

    this.axisLayer.add(this.axis.getKonvaGroup());

    this.backgroundLayer.add(new Konva.Rect({
      width: this.stage.getWidth(),
      height: this.stage.getHeight(),
      fill: 'black',
    }));

    this.stage.add(this.backgroundLayer);
    this.stage.add(this.pathsLayer);
    this.stage.add(this.mainLayer);
    this.stage.add(this.vectorsLayer);

    this.backgroundLayer.draw();
  }

  attachPlanets(planets: Planet[]) {
    this.planets = planets;
  }

  clearPaths() {
    this.pathsLayer.removeChildren();
    this.pathsLayer.draw();
  }

  toggleAxis(on: boolean) {
    if (on) {
      this.backgroundLayer.remove();
      this.pathsLayer.remove();
      this.axisLayer.remove();
      this.mainLayer.remove();
      this.vectorsLayer.remove();

      this.stage.add(this.backgroundLayer);
      this.stage.add(this.pathsLayer);
      this.stage.add(this.axisLayer);
      this.stage.add(this.mainLayer);
      this.stage.add(this.vectorsLayer);

      this.mainLayer.draw();
      this.axisLayer.draw();
      this.vectorsLayer.draw();
    } else {
      this.axisLayer.remove();
    }
  }

  draw() {
    // Clear the canvas
    this.mainLayer.removeChildren();
    this.vectorsLayer.removeChildren();

    this.planets.forEach(planet => {
      const group = planet.getKonvaGroup();
      group.x(this.stage.getWidth() / 2);
      group.y(this.stage.getHeight() / 2);
      group.scaleY(-1);
      this.mainLayer.add(group);
    });

    // Trace paths
    this.planets.filter(planet => planet.flags.showPath).forEach(planet => {
      const poop = planet.getKonvaPoop();
      poop.x(this.stage.getWidth() / 2);
      poop.y(this.stage.getHeight() / 2);
      poop.scaleY(-1);
      this.pathsLayer.add(poop);
      poop.draw();
    });

    // Velocity vectors
    this.planets.filter(planet => planet.flags.showVelocity).forEach(planet => {
      const vector = planet.getKonvaVelocityVector();
      vector.x(this.stage.getWidth() / 2);
      vector.y(this.stage.getHeight() / 2);
      vector.scaleY(-1);
      this.vectorsLayer.add(vector);
    });

    // Acceleration Vectors
    this.planets.filter(planet => planet.flags.showAcceleration).forEach(planet => {
      const vector = planet.getKonvaAccelerationVector();
      vector.x(this.stage.getWidth() / 2);
      vector.y(this.stage.getHeight() / 2);
      vector.scaleY(-1);
      this.vectorsLayer.add(vector);
    });

    // Redraw
    this.mainLayer.draw();
    this.vectorsLayer.draw();
  }
}
