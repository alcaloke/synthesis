// A. logamithmic spiral
const lSpiral = (diameter, a, speed, shaper, range) => {
  let t = speed + frameCount * 0.0
  let resolution = 10

  let c = 50
  let dc = 1.5

  for (let i = -360 * range; i <= 360 * range; i += resolution) {
    let theta = radians(i) * shaper + t
    let phi = radians(i) + t
    let j = a * exp(a * theta) * sin(theta)
    let k = a * exp(a * phi) * cos(phi)

    push()
    colorMode(HSB, 1000)
    c += dc
    fill(c, 1000, 1000)
    ellipse(j, k, diameter, diameter, 100)
    pop()
  }
}

// B. sinusoidal spiral
const sSpiral = (diameter, span, n, speed) => {
  for (let i = -180; i <= 180; i += 1) {
    let t = frameCount * speed
    let theta = radians(i) + t
    let phi = radians(i) + t
    let x = sqrt(span * span * cos(n * theta)) * cos(theta)
    let y = sqrt(span * span * cos(n * phi)) * sin(phi)
    ellipse(x, y, diameter, diameter, 100)
  }
}

// C. coth spiral
const cSpiral = (diameter, span, c, speed) => {
  let t = frameCount * speed
  for (let i = -180; i <= 180; i += 1) {
    let theta = radians(i) + sin(t)
    let phi = radians(i) + sin(t)
    let x = -Math.sinh(2 * theta) / (cos(2 * c * theta) - Math.cosh(2 * theta))
    let y = sin(2 * c * phi) / (cos(2 * c * phi) - Math.cosh(2 * phi))
    ellipse(x * span, y * span, diameter, diameter, 100)
  }
}
