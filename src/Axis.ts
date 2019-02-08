import * as Konva from 'konva';
import { Point } from './Physics';

export class Axis {
  public width: number;
  public height: number;
  public origin: Point;

  constructor({ width, height }: { width: number, height: number }, origin: Point) {
    this.width = width;
    this.height = height;
    this.origin = origin;
  }

  getKonvaGroup(): Konva.Group {
    const group = new Konva.Group();

    // x-axis
    group.add(new Konva.Line({
      points: [
        0, this.height / 2,
        this.width, this.height / 2,
      ],
      strokeWidth: 2,
      stroke: 'grey',
    }));

    // y-axis
    group.add(new Konva.Line({
      points: [
        this.width / 2, 0,
        this.width / 2, this.height,
      ],
      strokeWidth: 2,
      stroke: 'grey',
    }));

    // x-axis guide marks
    group.add(
      new Konva.Line({
        points: [
          this.width * 0.75, this.height / 2 - 10,
          this.width * 0.75, this.height / 2 + 10,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Text({
        text: String(this.width * 0.75 - this.origin.x),
        fill: 'grey',
        align: 'center',
        width: 50,
        height: 20,
        x: this.width * 0.75 - 25,
        y: this.height / 2 - 24,
      }),
      new Konva.Line({
        points: [
          this.width * 0.25, this.height / 2 - 10,
          this.width * 0.25, this.height / 2 + 10,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Text({
        text: String(this.width * 0.25 - this.origin.x),
        fill: 'grey',
        align: 'center',
        width: 50,
        height: 20,
        x: this.width * 0.25 - 25,
        y: this.height / 2 - 24,
      })
    );

    // y-axis guide marks
    group.add(
      new Konva.Line({
        points: [
          this.width / 2 + 10, this.height * 0.75,
          this.width / 2 - 10, this.height * 0.75,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Text({
        text: String(-(this.height * 0.75 - this.origin.y)),
        fill: 'grey',
        align: 'center',
        verticalAlign: 'center',
        width: 50,
        height: 20,
        x: this.width / 2,
        y: this.height * 0.75 - 5,
      }),
      new Konva.Line({
        points: [
          this.width / 2 + 10, this.height * 0.25,
          this.width / 2 - 10, this.height * 0.25,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Text({
        text: String(-(this.height * 0.25 - this.origin.y)),
        fill: 'grey',
        align: 'center',
        verticalAlign: 'center',
        width: 50,
        height: 20,
        x: this.width / 2,
        y: this.height * 0.25 - 5,
      }),
    );

    // more x-axis guide marks
    group.add(
      new Konva.Line({
        points: [
          this.width * 0.125, this.height / 2 - 6,
          this.width * 0.125, this.height / 2 + 6,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Line({
        points: [
          this.width * 0.375, this.height / 2 - 6,
          this.width * 0.375, this.height / 2 + 6,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Line({
        points: [
          this.width * 0.875, this.height / 2 - 6,
          this.width * 0.875, this.height / 2 + 6,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Line({
        points: [
          this.width * 0.625, this.height / 2 - 6,
          this.width * 0.625, this.height / 2 + 6,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      })
    );

    // more y-axis guide marks
    group.add(
      new Konva.Line({
        points: [
          this.width / 2 + 6, this.height * 0.125,
          this.width / 2 - 6, this.height * 0.125,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Line({
        points: [
          this.width / 2 + 6, this.height * 0.375,
          this.width / 2 - 6, this.height * 0.375,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Line({
        points: [
          this.width / 2 + 6, this.height * 0.625,
          this.width / 2 - 6, this.height * 0.625,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      }),
      new Konva.Line({
        points: [
          this.width / 2 + 6, this.height * 0.875,
          this.width / 2 - 6, this.height * 0.875,
        ],
        strokeWidth: 2,
        stroke: 'grey',
      })
    );

    return group;
  }
}
