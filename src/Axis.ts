import * as Konva from 'konva';

export class Axis {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
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
        text: String(this.width * 0.75),
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
        text: String(this.width * 0.25),
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
        text: String(this.height * 0.75),
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
        text: String(this.height * 0.25),
        fill: 'grey',
        align: 'center',
        verticalAlign: 'center',
        width: 50,
        height: 20,
        x: this.width / 2,
        y: this.height * 0.25 - 5,
      }),
    );

    return group;
  }
}
