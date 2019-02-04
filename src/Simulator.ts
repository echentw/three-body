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

  constructor(planets: Planet[]) {
    this.planets = planets;
    this.stage = new Konva.Stage({
      container: 'canvas',
      width: 1000,
      height: 700,
    });
    this.axis = new Axis(this.stage.getWidth(), this.stage.getHeight());

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

    this.planets.forEach(planet => this.mainLayer.add(planet.getKonvaGroup()));

    // Optional flags
    this.planets.filter(planet => planet.flags.showPath).forEach(planet => {
      const poop = planet.getKonvaPoop();
      this.pathsLayer.add(poop);
      poop.draw();
    });
    this.planets.filter(planet => planet.flags.showVelocity).forEach(planet => {
      this.vectorsLayer.add(planet.getKonvaVelocityVector());
    });
    this.planets.filter(planet => planet.flags.showAcceleration).forEach(planet => {
      this.vectorsLayer.add(planet.getKonvaAccelerationVector());
    });

    // Redraw
    this.mainLayer.draw();
    this.vectorsLayer.draw();
  }
}
