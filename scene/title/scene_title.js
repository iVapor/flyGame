class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text){
        return new this(game, text)
    }
    draw() {
        // draw labels
        log('draw labels', this.game, this.text)
        this.game.context.fillText(this.text, 100, 190)
    }
    update(){

    }
}
class GuaParticle extends GuaImage{
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }

}
class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setUp()
    }
    static new(game){
        return new this(game)
    }
    setUp(){
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }
    update(){
        this.duration--
        //添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            //设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        //更新所有的小火花
        for(var p of this.particles){
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw(){
        // if (this.duration < 0) {
        //     //todo 这是一个临时的解决方案，应该从 scene 中删掉它自己
        //     return
        // }
        for(var p of this.particles){
            p.draw()
        }
    }
}
class SceneTitle extends GuaScene{
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        var ps = GuaParticleSystem.new(game)
        this.addElement(ps)
    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
