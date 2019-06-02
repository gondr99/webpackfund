import $ from 'jquery';
const {PI, min} = Math;
export default class Fund {
    constructor(el, data){
        this.el = el; //엘레멘트 넣어주고
        let template = this.makeTemplate(data);
        el.innerHTML = template;
        
        this.canvas = el.querySelector("canvas");
        this.title = el.querySelector(".fund-title");
        this.desc = el.querySelector(".description");

        //캔버스의 크기를 스타일에서의 크기와 동일하게 맞춰준다.
        this.ctx = this.canvas.getContext("2d");        
        this.resize();

        this.current = 0; //애니메이션 드로우를 위한 값
        this.value = data.percent;
        this.lineWidth = 25; //선두께

    }

    makeTemplate(data) {
        return `<div class="fund">
                <div class="graph-container">
                    <canvas></canvas>
                </div>
                <div class="info-box">
                    <h1 class="fund-title">${data.title}</h1>
                    <p class="description">${data.description}</p>
                </div>
            </div>`;
    }

    animateDraw() {
        this.current = 0;
        let intId = setInterval(()=>{
            this.current++;
            if(this.current >= this.value) {
                this.current = this.value;
                clearInterval(intId);
            }
            this.draw(this.current);
        }, 1000 / 30);
    }

    draw(p){
        let ctx = this.ctx;
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2; //중점좌표 잡고
        let r = min(x, y) - 10; //반지름 잡고

        ctx.fillStyle = "#ddd";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r, 0, 2 * PI);
        ctx.fill();

        ctx.fillStyle = "rgb(101, 171, 243, 1)";
        ctx.beginPath();
        ctx.moveTo(x, y);

        //100 : 2 * PI = p : x
        // 2* PI * p / 100 = x
        ctx.arc(x, y, r, - PI / 2, -PI / 2 + 2 * PI * p / 100);
        ctx.fill();
        
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, r - this.lineWidth, 0, 2 * PI);
        ctx.fill();
        
        ctx.fillStyle = "#000";
        ctx.font = "25px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(p + "%", x, y);
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.draw(this.value);
    }
}