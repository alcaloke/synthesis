class ShaderTextX {
  constructor(word, font, fontSize, s) {
    this.word = word
    this.font = font
    this.fontSize = fontSize
    this.s = s

    this.charArr = []
    this.charPoints = []
    this.charPointsMinMax = []
  }

  setPoints() {
    // textToPoints for the 3 letter word Joy; each character pushed into charArr
    for (let i = 0; i < this.word.length; i++) {
      let char = this.font.textToPoints(this.word[i], 0, 0, this.fontSize, {
        sampleFactor: 1,
        simplifyThreshold: 0,
      })
      this.charArr.push(char)
    }

    // for each character, x & y co-ordinates pushed in to charPoints array
    for (let char of this.charArr) {
      let x = []
      let y = []
      for (let p of char) {
        x.push(p.x)
        y.push(p.y)
      }
      this.charPoints.push(x)
      this.charPoints.push(y)
    }

    // min & max values of x & y co-ordinates pushed into charPointsMinMax array
    for (let m of this.charPoints) {
      this.charPointsMinMax.push(Math.min(...m))
      this.charPointsMinMax.push(Math.max(...m))
    }
  }

  draw(textureOne) {
    for (let i = 0; i < this.charArr.length; i++) {
      // extracting min & max values for x & y of each char
      let xmin = this.charPointsMinMax[i * 4]
      let xmax = this.charPointsMinMax[i * 4 + 1]
      let ymin = this.charPointsMinMax[i * 4 + 2]
      let ymax = this.charPointsMinMax[i * 4 + 3]
      let dx = xmax - xmin + this.s

      // drawing each character with vertex function
      push()
      texture(textureOne)
      noStroke()
      beginShape()
      for (let j = 0; j < this.charArr[i].length; j++) {
        let p = this.charArr[i][j]
        let u = map(p.x, xmin, xmax, 0, 1)
        let v = map(p.y, ymin, ymax, 0, 1)
        vertex(p.x, p.y, 0, u, v)
      }
      endShape(CLOSE)
      pop()
      translate(dx, 0, 0)
    }
  }
}
