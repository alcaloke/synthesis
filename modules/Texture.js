class Texture {
  constructor() {
    this.texture
  }

  create() {
    this.texture = createGraphics(width, height, WEBGL)
    this.texture.noStroke()
    return this.texture
  }

  load(shader) {
    this.texture.shader(shader)
    shader.setUniform("u_resolution", [canvas.width, canvas.height])
    shader.setUniform("u_time", millis() / 1000.0)
    shader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)])
    this.texture.rect(0, 0, width, height)
  }
}
