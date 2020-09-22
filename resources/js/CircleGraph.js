class CircleGraph {
    constructor(selector, datas) {
        super(selector, datas);

        this.radius = Math.min(this.innerW, this.innerH);

        log( this.radius );
    }
}