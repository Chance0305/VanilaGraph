class PieGraph extends Graph {
    constructor(selector, datas) {
        super(selector, datas);

        this.radius = Math.min(this.innerW, this.innerH);

        this.render();
    }

    render() {
        
    }
}