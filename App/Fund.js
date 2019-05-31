import $ from 'jquery';

export default class Fund {
    constructor(el, data){
        this.el = el; //엘레멘트 넣어주고
        let template = this.makeTemplate(data);
        el.append(template);

        this.canvas = el.find("canvas");
        this.title = el.find(".fund-title");
        this.desc = el.find(".description");

        console.log(this.canvas, this.title, this.desc);
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
}