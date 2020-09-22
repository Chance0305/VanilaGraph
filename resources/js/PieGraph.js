class PieGraph extends Graph {
    constructor(selector, datas, selected = undefined) {
        super(selector, datas);

        this.radius = Math.min(this.innerW, this.innerH) / 2;
        this.selected = selected;

        this.render();

    }

    render() {
        const total = Object.values(this.datas).reduce((p,c) => p + c, 0);
        const max = Math.max(...Object.values(this.datas));
        const x = this.canvasW/2;
        const y = this.canvasH/2;

        let preAngle = 0;
        Object.entries(this.datas).forEach((data, idx) => {
            const key = data[0];
            const value = data[1];
            const angle = Math.PI * 2 * value / total;
            const color = this.colors[Math.floor(idx%this.colors.length)];

            if ( this.selected && this.selected == key ) { // 선택한 부채꼴 띄우기
                const sx = (x + Math.cos(preAngle + angle / 2) * (this.radius * 0.2));
                const sy = (y + Math.sin(preAngle + angle / 2) * (this.radius * 0.2));
                this.renderArc(sx, sy, this.radius, preAngle, preAngle + angle, color);
            } else { // 그냥 그리기
                this.renderArc(x, y, this.radius, preAngle, preAngle + angle, color);
            }

            const centerAngle = preAngle + angle / 2; // 방금 그린 부채꼴의 중앙각
            const tx = Math.cos(centerAngle) * (this.radius * 1.2); // 중앙각의 코사인값 * (반지름*1.2)
            const ty = Math.sin(centerAngle) * (this.radius * 1.2); // 중앙각의 코사인값 * (반지름*1.2)
            const tw = this.ctx.measureText(value).width;
            this.renderLabel(`${key} (${value})`, x+tx-tw, y+ty);

            preAngle += angle;
        });
    }

    renderArc(x, y, r, pa, ca, color) { // x, y, radius, previousAngle, currentAngle, color
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.fillStyle = color;
        ctx.arc(x, y, r, pa, ca); // Outer circle
        ctx.fill();
    }

    renderLabel(lbl, x, y) { // text, x, y
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(lbl, x, y);
    }
}