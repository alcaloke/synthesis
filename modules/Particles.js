class Particle {
  constructor(x, y) {
    // this.pos = createVector(random(width), random(height))

    this.pos = createVector(x, y)
    this.target = createVector(x, y)
    this.vel = p5.Vector.random2D()
    this.acc = createVector()

    this.maxspeed = 15
    this.maxforce = 2
  }

  behaviours() {
    let arrive = this.arrive(this.target)
    // let mouse = createVector(mouseX - width / 2, mouseY - height / 2)
    // let flee = this.flee(mouse)
    // let flee = this.flee(obj)

    arrive.mult(1)
    // flee.mult(1.5)

    this.applyForce(arrive)
    // this.applyForce(flee)
  }

  addBehaviours(obj, dist) {
    let flee = this.flee(obj, dist)
    flee.mult(1.5)
    this.applyForce(flee)
  }

  applyForce(f) {
    this.acc.add(f)
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos)
    let d = desired.mag()
    let speed = this.maxspeed
    if (d < 100) {
      speed = map(d, 0, 100, 0.1, this.maxspeed)
    }
    desired.setMag(speed)
    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxforce)
    return steer
  }

  flee(target, dist) {
    let desired = p5.Vector.sub(target, this.pos)
    let d = desired.mag()
    let speed = this.maxspeed
    if (d < dist) {
      speed = map(d, 0, dist, this.maxspeed, 0.1)
      desired.setMag(speed)
      // desired.setMag(this.maxspeed)
      desired.mult(-1)
      let steer = p5.Vector.sub(desired, this.vel)
      steer.limit(this.maxforce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  update() {
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }

  show() {
    stroke("hotpink")
    strokeWeight(0.5)
    point(this.pos.x, this.pos.y)
  }
}
