type Vector = {
  x: number;
  y: number;
};

type Point = Vector;
type Velocity = Vector;

type PlanetSpecs = {
  radius: number;
  mass: number;
  position: Point;
  velocity: Velocity;
};

class Planet {
  protected readonly context: CanvasRenderingContext2D;

  public readonly radius: number;
  public readonly mass: number;
  public position: Point;
  public velocity: Velocity;

  constructor(context: CanvasRenderingContext2D, specs: PlanetSpecs) {
    this.context = context;
    this.position = specs.position;
    this.radius = specs.radius;
    this.mass = specs.mass;
    this.velocity = specs.velocity;
  }

  // Updates this planet's position given the other planets' positions and masses.
  update(planets: Planet[]) {
    const netForce: Vector = { x: 0, y: 0 };

    planets.forEach(planet => {
      const G = 1.0;
      const distance = Math.sqrt(
        Math.pow(this.position.x - planet.position.x, 2) + Math.pow(this.position.y - planet.position.y, 2)
      );
      const force = G * this.mass * planet.mass / distance * distance;
      const direction: Vector = {
        x: (planet.position.x - this.position.x) / distance,
        y: (planet.position.y - this.position.y) / distance,
      };

      netForce.x += force * direction.x;
      netForce.y += force * direction.y;
    });

    const netAcceleration: Vector = {
      x: netForce.x / this.mass,
      y: netForce.y / this.mass,
    };

    const dt = 0.05;

    this.velocity.x += netAcceleration.x * dt;
    this.velocity.y += netAcceleration.y * dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = 'green';
    this.context.fill();
  }
}

function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d');

  const planet = new Planet(context, {
    radius: 10.0,
    mass: 1.0,
    position: {
      x: 100.0,
      y: 300.0,
    },
    velocity: {
      x: -2.0,
      y: -1.0,
    },
  });

  const planet2 = new Planet(context, {
    radius: 20.0,
    mass: 10.0,
    position: {
      x: 400.0,
      y: 300.0,
    },
    velocity: {
      x: 0.0,
      y: 20.0,
    },
  });

  const planet3 = new Planet(context, {
    radius: 20.0,
    mass: 10.0,
    position: {
      x: 600.0,
      y: 300.0,
    },
    velocity: {
      x: 0.0,
      y: -20.0,
    },
  });

  function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    planet.update([planet2, planet3]);
    planet2.update([planet, planet3]);
    planet3.update([planet, planet2]);

    planet.draw();
    planet2.draw();
    planet3.draw();

    requestAnimationFrame(update);
  }

  update();
}

main();
