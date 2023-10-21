let shaderOne, txrOne, textureOne
let shaderTwo, txrTwo, textureTwo
let shaderThree, txrThree, textureThree
let ss, ss2
let r1 = 170
let leaf
let rlx = 220
let rly = 300
let multiPlayer, loopTime, bass, sineKey, ks, drum
let playButton, kickButton, bassButton, sineButton, drumButton
let slider
let x, y, phi
let bassMeter, sineMeter, ksMeter, drumMeter
let bassEnergy, ksEnergy, sineEnergy, drumEnergy
let sec
let limter, efx
let crossCap = []
let z = 0

function preload() {
  shaderOne = loadShader(
    "../shaders/shader.vert",
    "../shaders/polar/08-eye.frag"
    // "../shaders/polar/07-swirl.frag"
    // "../shaders/cartesian/06-wave.frag"
  )

  shaderTwo = loadShader(
    "../shaders/shader.vert",
    // "../shaders/polar/03-orangina.frag"
    // "../shaders/polar/08-eye.frag"
    "../shaders/cartesian/06-wave.frag"
  )

  shaderThree = loadShader(
    "../shaders/shader.vert",
    "../shaders/polar/09-eye-mercury.frag"
    // "../shaders/polar/04-jupiter.frag"
    // "../shaders/cartesian/03-mercury.frag"
  )

  limiter = new Tone.Limiter(-0.3).toDestination()
  // efx = new Tone.Filter({
  //   type: "lowpass",
  // }).connect(limiter)

  multiPlayer = new Tone.Players(
    {
      bs: "audio/remix/bass.wav",
      sk: "audio/remix/sineKey.wav",
      ks: "audio/remix/kns.wav",
      dr: "audio/remix/drums.wav",
    },
    () => {
      loopTime = multiPlayer.player("bs").buffer.duration
      // console.log(loopTime)

      bass = multiPlayer.player("bs")
      sineKey = multiPlayer.player("sk")
      ks = multiPlayer.player("ks")
      drum = multiPlayer.player("dr")

      bass.sync().start()
      sineKey.sync().start()
      ks.sync().start()
      drum.sync().start()

      multiPlayer.volume.value = 2

      drum.volume.value = 0
      drum.mute = false
      ks.mute = true
      sineKey.mute = false
      bass.mute = true

      bassMeter = new Tone.Meter({
        normalRange: true,
      })
      bass.connect(bassMeter)

      sineMeter = new Tone.Meter({
        normalRange: true,
      })
      sineKey.connect(sineMeter)

      ksMeter = new Tone.Meter({
        normalRange: true,
      })
      ks.connect(ksMeter)

      drumMeter = new Tone.Meter({
        normalRange: true,
      })
      drum.connect(drumMeter)
    }
  ).connect(limiter)
}

function setup() {
  // 0. Setup
  createCanvas(windowWidth, windowHeight, WEBGL)
  textureMode(NORMAL)

  txrOne = new Texture()
  textureOne = txrOne.create()

  txrTwo = new Texture()
  textureTwo = txrTwo.create()

  txrThree = new Texture()
  textureThree = txrThree.create()

  // 1a. Set ss shapes
  // ss = new SuperShapeMotion(2, r1, r1, 0.5, 1.9, 1.0)
  ss = new SuperShapeMotion(3, r1, r1, 1.0, 2.3, 0.5)
  ss.drawShape()
  // rotate particles by 90 degrees to the left
  const theta = -60
  const d = 160
  for (p of ss.particles) {
    p.pos.rotate(radians(theta))
    p.target.rotate(radians(theta))
    p.pos.mult(-1)
    p.target.mult(-1)
    p.pos.add(d, 0)
    p.target.add(d, 0)
  }

  ss2 = new SuperShapeMotion(3, r1, r1, 1.0, 2.3, 0.5)
  ss2.drawShape()
  const rotation = -60
  for (p of ss2.particles) {
    p.pos.rotate(radians(rotation))
    p.target.rotate(radians(rotation))
    p.pos.y *= -1
    p.target.y *= -1
    p.pos.add(-d, 0)
    p.target.add(-d, 0)
  }

  // 1b. Set leaf shape
  lead = new SuperShape(2, rlx, rly, 0.375, 0.1, 0.5)

  // 2. Set buttons & sliders
  select("#button-box").position(0, 0)
  playButton = select("#play")
  playButton.mousePressed(playPause)
  kickButton = select("#kick")
  kickButton.mousePressed(muteKick)
  bassButton = select("#bass")
  bassButton.mousePressed(muteBass)
  sineButton = select("#sk")
  sineButton.mousePressed(muteSine)
  drumButton = select("#drum")
  drumButton.mousePressed(muteDrum)

  // slider = createSlider(0, TWO_PI, 2.7, 0.01)
  // slider.position(0, 50)

  // 3. Crosscap setup
  let n = 30
  let m = 125
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let u = (j * (2 * PI)) / n
      let v = (i * (0.5 * PI)) / n

      let x = cos(u) * sin(2 * v) * m
      let y = sin(u) * sin(2 * v) * m
      let z = cos(v) * cos(v) - cos(u) * cos(u) * sin(v) * sin(v) * m
      let xyz = createVector(x, y, z)
      crossCap.push(xyz)
    }
  }
}

function draw() {
  // X. Setup
  background(0)
  // rotateZ(radians(180))

  shaderOne.setUniform("u_bassEnergy", bassEnergy)
  shaderOne.setUniform("u_sec", sec)

  shaderTwo.setUniform("u_drumEnergy", drumEnergy)
  shaderTwo.setUniform("u_sec", sec)

  shaderThree.setUniform("u_ksEnergy", ksEnergy)
  shaderThree.setUniform("u_sec", sec)

  // A1. ss Particles
  let obj = createVector(x, y)
  let mouse = createVector(mouseX - width / 2, mouseY - height / 2)

  push()
  for (p of ss.particles) {
    p.behaviours()
    p.addBehaviours(obj, 200)
    // p.addBehaviours(mouse, 100)
    p.update()
    // p.show()
  }
  pop()

  // A2. ss2 Particles
  push()
  for (p of ss2.particles) {
    p.behaviours()
    p.addBehaviours(obj, 200)
    // p.addBehaviours(mouse, 100)
    p.update()
    // p.show()
  }
  pop()

  // A3. leaf
  push()
  txrTwo.load(shaderTwo)
  texture(textureTwo)
  noStroke()
  translate(0, 140)
  rotateZ(radians(-90))
  lead.drawShape()
  pop()

  // B1. ss Vertex
  push()
  txrOne.load(shaderOne)
  texture(textureOne)
  noStroke()
  beginShape()
  for (let i = 0; i < ss.particles.length; i++) {
    vertex(
      ss.particles[i].pos.x,
      ss.particles[i].pos.y,
      0,
      ss.uv[i].x,
      ss.uv[i].y
    )
  }
  endShape()
  pop()

  // B2. ss2 vertex
  push()
  txrThree.load(shaderThree)
  texture(textureThree)
  noStroke()
  beginShape()
  for (let i = 0; i < ss2.particles.length; i++) {
    vertex(
      ss2.particles[i].pos.x,
      ss2.particles[i].pos.y,
      0,
      ss2.uv[i].x,
      ss2.uv[i].y
    )
  }
  endShape()
  pop()

  // C. Rotator
  sec = Tone.Transport.seconds
  // console.log(Tone.Transport.seconds.toFixed(3))
  phi = map(sec, 0, loopTime, 0, TWO_PI * 2)
  // theta = map(mouseY, height, 0, 0, TWO_PI)
  // theta = slider.value()
  // theta = 2 + bassEnergy * TWO_PI
  // console.log(theta)
  // let r = map(mouseY, height, 0, 150, 350)
  push()
  let r = 350
  x = r * cos(phi)
  y = r * sin(phi)
  stroke("hotpink")
  strokeWeight(10)
  // point(x, y)
  pop()

  // D. Draw Crosscap
  push()
  translate(0, -205)
  // let ang = map(mouseY, height, 0, -180, 0)
  // console.log(ang)
  rotateX(radians(-130))
  rotateZ(radians(z))
  colorMode(HSB, 100)
  strokeWeight(0.5)
  noFill()
  beginShape()
  for (let i = 0; i < crossCap.length; i++) {
    vertex(crossCap[i].x, crossCap[i].y, crossCap[i].z)
    let c = i / (crossCap.length / 30)
    stroke(35 + c, 100, 100)
  }
  endShape()
  pop()

  // X. Audio stuff
  if (multiPlayer.loaded) {
    bassEnergy = bassMeter.getValue()
    ksEnergy = ksMeter.getValue()
    drumEnergy = drumMeter.getValue()
    sineEnergy = sineMeter.getValue()

    z = 1 + z + 80 * ksEnergy

    // let freq = map(mouseX, 0, width, 0, 20000)
    // console.log(freq)
    // efx.set({
    //   frequency: freq,
    // })
  }
}

let counter = 0
Tone.Transport.on("loopEnd", (time) => {
  counter++
  // console.log(counter)
})

function keyPressed() {
  if (keyCode === 32) {
    startLoop()
  }
}

function playPause() {
  startLoop()
}

function startLoop() {
  if (Tone.context.state !== "running") {
    Tone.context.resume()
  }

  if (bass.state != "started") {
    Tone.Transport.set({
      bpm: 117.88,
      loop: true,
      loopEnd: loopTime,
    })
    Tone.Transport.start()
  } else {
    Tone.Transport.pause()
  }
}

function muteKick() {
  if (ks.mute !== true) {
    ks.mute = true
  } else {
    ks.mute = false
  }
}

function muteBass() {
  if (bass.mute !== true) {
    bass.mute = true
  } else {
    bass.mute = false
  }
}

function muteSine() {
  if (sineKey.mute !== true) {
    sineKey.mute = true
  } else {
    sineKey.mute = false
  }
}

function muteDrum() {
  if (drum.mute !== true) {
    drum.mute = true
  } else {
    drum.mute = false
  }
}
