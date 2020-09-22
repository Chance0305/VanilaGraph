class BarGraph extends Graph {
    constructor(selector, datas, type="horizontal") { // type horizontal, vertical
        super(selector, datas);

        this.type = type;
        this.barSize = 20;
    
        this.render();
    }

    render() {
        const max = Math.max(...Object.values(this.datas));
        const block = this.type == "horizontal" ? (this.innerH - this.barSize) / (this.data_length - 1) : (this.innerW - this.barSize) / (this.data_length - 1);

        for( let i=0; i<this.data_length; i++ ) {
            const data = this.datas[Object.keys(this.datas)[i]];
            const w = this.type == "horizontal" ? data / max * this.innerW : this.barSize;
            const h = this.type == "horizontal" ? this.barSize : data / max * this.innerH;
            const x = this.type == "horizontal" ? this.pad : (block*i) + this.pad;
            const y = this.type == "horizontal" ? (block*i) + this.pad : this.canvasH - h - this.pad;
            const color = this.colors[Math.floor(i%this.colors.length)];
            
            this.renderBar(x, y, w, h, color);

            const key = Object.keys(this.datas)[i];
            if ( this.type == "horizontal" ) {
                this.renderLabel(key, this.pad/2, y + (this.barSize/2)); // key lbl
                this.renderLabel(data, x+w+10, y+(this.barSize/2)); // value lbl
            } else {
                this.renderLabel(key, x + (this.barSize/2), this.canvasH - (this.pad/2));
                this.renderLabel(data, x + (this.barSize/2), y-10);
            }
        }
    }


    renderBar(x, y, w, h, color) {
        const ctx = this.ctx;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    renderLabel(lbl, x, y) {
        const ctx = this.ctx;

        this.ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(lbl, x, y);
    }
}