class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
        this.removeCount = true
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
        var index = this.elements.length - 1
        return index
    }
    removeElement(particle, index) {
        if ((particle.duration < 0) && this.removeCount) {
            this.elements.splice(index, 1)
            this.removeCount = false
        }
    }
    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
