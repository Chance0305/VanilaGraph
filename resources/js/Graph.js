class Graph {
    constructor(selector, datas) {
        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = 600;
        this.canvas.height = 400;

        this.datas = datas;
        this.data_length = Object.keys(this.datas).length;

        this.colors = ["#ff6", "#f6f", "#6ff", "#f66", "#66f", "#6f6", "#666"];
        this.pad = 50;

        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
        this.innerW = this.canvas.width - (this.pad*2);
        this.innerH = this.canvas.height - (this.pad*2);
    }

    render() {}
}