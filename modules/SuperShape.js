class SuperShape {
  constructor(m, xr, yr, n1, n2, n3) {
    this.m = m
    this.xradius = xr
    this.yradius = yr
    this.n1 = n1
    this.n2 = n2
    this.n3 = n3

    this.a = 1
    this.b = 1

    this.dn1 = 0.0005
    this.dn2 = 0.02
    this.dn3 = 0.02
  }

  setShape(theta) {
    let part1 = (1 / this.a) * cos((theta * this.m) / 4)
    part1 = abs(part1)
    part1 = pow(part1, this.n2)

    let part2 = (1 / this.b) * sin((theta * this.m) / 4)
    part2 = abs(part2)
    part2 = pow(part2, this.n3)

    let part3 = pow(part1 + part2, 1 / this.n1)

    if (part3 === 0) {
      return 0
    }

    return 1 / part3
  }

  drawShape() {
    let divisor = 1000
    let increment = TWO_PI / divisor

    let xArr = []
    let yArr = []

    for (let angle = 0; angle < TWO_PI; angle += increment) {
      let r = this.setShape(angle)
      let x = this.xradius * r * cos(angle)
      let y = this.yradius * r * sin(angle)
      xArr.push(x)
      yArr.push(y)
    }
    let xMin = Math.min(...xArr)
    let xMax = Math.max(...xArr)
    let yMin = Math.min(...yArr)
    let yMax = Math.max(...yArr)

    beginShape()
    for (let angle = 0; angle < TWO_PI; angle += increment) {
      let r = this.setShape(angle)
      let x = this.xradius * r * cos(angle)
      let y = this.yradius * r * sin(angle)
      let u = map(x, xMin, xMax, 0, 1)
      let v = map(y, yMin, yMax, 0, 1)
      vertex(x, y, 0, u, v)
    }
    endShape(CLOSE)
  }

  moveOne(u, v) {
    this.n1 += this.dn1
    if (this.n1 > v || this.n1 < u) {
      this.dn1 = this.dn1 * -1
    }
  }

  moveTwo(u, v) {
    this.n2 += this.dn2
    if (this.n2 > v || this.n2 < u) {
      this.dn2 = this.dn2 * -1
    }
  }

  moveThree(u, v) {
    this.n3 += this.dn3
    if (this.n3 > v || this.n3 < u) {
      this.dn3 = this.dn3 * -1
    }
  }
}
