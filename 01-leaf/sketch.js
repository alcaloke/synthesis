function preload() {
  shaderOne = loadShader(
    "../shaders/shader.vert",
    "../shaders/cartesian/02-cold-e1.frag"
  )
  shaderTwo = loadShader(
    "../shaders/shader.vert",
    "../shaders/cartesian/01-warm-e1.frag"
  )
  shaderThree = loadShader(
    "../shaders/shader.vert",
    "../shaders/cartesian/02-cold-e2.frag"
  )
  shaderFour = loadShader(
    "../shaders/shader.vert",
    "../shaders/polar/03-orangina-e1.frag"
  )
  shaderFive = loadShader(
    "../shaders/shader.vert",
    "../shaders/polar/03-orangina-e2.frag"
  )
  shaderSix = loadShader(
    "../shaders/shader.vert",
    "../shaders/polar/03-orangina-e3.frag"
  )
  mv2 = loadSound("MV2-1.09.mp3")
}

let shaderOne, textureOne, txtr1
let shaderTwo, textureTwo, txtr2
let shaderThree, textureThree, txtr3
let shaderFour, textureFour, txtr4
let shaderFive, textureFive, txtr5
let shaderSix, textureSix, txtr6

let mv2, fft, energy
let xoff = 0

let leaf, leafSmall, egg, cross
let r = 140
let r2 = 75
let r3 = 100
let r4 = 55
let n = 0.6

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  textureOne = new Texture()
  txtr1 = textureOne.create()
  textureTwo = new Texture()
  txtr2 = textureTwo.create()
  textureThree = new Texture()
  txtr3 = textureThree.create()
  textureFour = new Texture()
  txtr4 = textureFour.create()
  textureFive = new Texture()
  txtr5 = textureFive.create()
  textureSix = new Texture()
  txtr6 = textureSix.create()
  textureMode(NORMAL)

  leaf = new SuperShape(1, r, r, 0.2, n, n)
  leafSmall = new SuperShape(3, r2, r2, 1, 2.3, 0.5)
  egg = new SuperShape(2, r3, r3, 0.5, 1.9, 1.0)
  cross = new SuperShape(8, r4, r4, 0.1, 0.1, 6.7)

  fft = new p5.FFT([0.8], [64])
}

function draw() {
  // 1. Texture setup
  textureOne.load(shaderOne)
  shaderOne.setUniform("u_energy", energy)
  textureTwo.load(shaderTwo)
  shaderTwo.setUniform("u_energy", energy)
  textureThree.load(shaderThree)
  shaderThree.setUniform("u_energy", energy)
  textureFour.load(shaderFour)
  shaderFour.setUniform("u_energy", energy)
  textureFive.load(shaderFive)
  shaderFive.setUniform("u_energy", energy)
  textureSix.load(shaderSix)
  shaderSix.setUniform("u_energy", energy)

  // 2. FFT setup
  spectrum = fft.analyze()
  energy = fft.getEnergy(100, 2000)
  energy = map(energy, 0, 255, 0, 1)

  // 3. Background setup
  background(245)
  noStroke()

  // A1. Leaf
  push()
  texture(txtr1)
  translate(-r, 110, 0)
  for (let i = 0; i < 9; i++) {
    push()
    let theta = (i * HALF_PI) / 4
    let y = r * sin(theta)
    let x = r - r * cos(theta)
    translate(x, -y, 0)
    rotateZ(theta)
    leaf.drawShape()
    pop()
  }
  pop()

  // A2. Spiral  setup
  let d = 7
  let a = 0.201
  let dx = 95
  let dy = 200
  let spd = 0
  let shaper = 1

  // let spd = map(energy, 0.0, 1, -0.5, 0.5)
  // let shaper = map(mouseX, 0, width, 0.8, 1.2)
  // let dxoff = map(energy, 0, 1, 0.01, 0.05)
  // xoff += dxoff
  // let shaper = map(noise(xoff), 0, 1, 0.9, 1.1)
  // let a = map(energy, 0.0, 1, 0.18, 0.22)

  // B3. Spiral
  push()
  fill(0)
  translate(dx, dy, 0)
  lSpiral(d, a, spd, shaper, 5)
  pop()

  push()
  fill(0)
  rotateY(PI)
  translate(dx, dy, 0)
  lSpiral(d, a, spd, shaper, 5)
  pop()

  // B. Leaf - Small Right
  push()
  translate(-100, -260, 0)
  texture(txtr2)

  rotateY(radians(180))
  rotateZ(radians(210))
  leafSmall.drawShape()

  pop()

  // B. Leaf - Small Left
  push()
  translate(100, -260, 0)
  texture(txtr3)
  rotateZ(radians(210))
  leafSmall.drawShape()
  pop()

  // C. Egg
  push()
  translate(0, -150, 0)
  rotateZ(-HALF_PI)
  texture(txtr4)
  egg.drawShape()
  pop()

  // D. Cross - left
  push()
  translate(-130, -70, 0)
  rotateZ(radians(45))
  texture(txtr5)
  cross.drawShape()
  pop()

  // E. Cross - left
  push()
  translate(130, -70, 0)
  rotateZ(radians(45))
  texture(txtr6)
  cross.drawShape()
  pop()

  // X. FFT Graph
  // push()
  // translate(-175, 310, 0)
  // for (let i = 0; i < spectrum.length; i++) {
  //   let h = map(spectrum[i], 0, 255, 0, 50)
  //   let w = 5.5
  //   let x = i * w
  //   colorMode(HSB, 1000)
  //   let c = 400 + i * (200 / spectrum.length)
  //   fill(c, 1000, 1000)
  //   rect(x, 0, w, -h)
  // }
  // pop()
}

function mouseClicked() {
  if (!mv2.isPlaying()) {
    mv2.loop()
  }
}
