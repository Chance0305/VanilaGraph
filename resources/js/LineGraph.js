class LineGraph extends Graph {
    constructor(selector, datas) {
        super(selector, datas);

        this.dotSize = 4;

        this.render();
    }

    render() {
        const max = Math.max(...Object.values(this.datas));
        const block = (this.innerW - this.dotSize) / (this.data_length - 1);

        let px = this.pad;
        let py = this.innerH - (Object.entries(this.datas)[0][1] / max * this.innerH) + this.pad;

        for ( let i=0; i<this.data_length; i++ ) {
            const key = Object.entries(this.datas)[i][0];
            const value = Object.entries(this.datas)[i][1];
            const cx = (block*i) + this.pad;
            const cy = this.innerH - (value / max * this.innerH) + this.pad;

            this.renderDot(cx, cy, this.dotSize, 0, Math.PI*2);
            this.renderLine(px, py, cx, cy);
            this.renderLabel(`${key} (${value})`, cx, cy - 15);

            px = cx;
            py = cy;
        }
    }

    renderDot(x, y, r, sa, ea) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.fillStyle = "#dfdfdf";
        ctx.arc(x, y, r*2, sa, ea);
        ctx.fill();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.fillStyle = "#88f";
        ctx.arc(x, y, r, sa, ea);
        ctx.fill();
        ctx.closePath();
    }

    renderLine(px, py, cx, cy) {
        const ctx = this.ctx;

        ctx.beginPath(); 
        ctx.strokeStyle = "#88f";
        ctx.lineWidth = 3;
        ctx.moveTo(px, py);  
        ctx.lineTo(cx, cy);
        ctx.stroke(); 
    }

    renderLabel(lbl, x, y) {
        const ctx = this.ctx;

        const w = this.ctx.measureText(lbl).width;
        x = x - w/2;

        ctx.fillStyle = "#000";
        ctx.fillText(lbl, x, y);
    }
}