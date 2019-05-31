import $ from 'jquery';
import Fund from './Fund';

export default class MainApp {
    constructor(){
        this.sectionList = $("section");
        this.eventHandle();
        this.resize();

        this.fundDataList = [
            {title:"시험펀드1", description:"펀드에 대한 설명 1"},
            {title:"시험펀드2", description:"펀드에 대한 설명 2"},
            {title:"시험펀드3", description:"펀드에 대한 설명 3"},
            {title:"시험펀드4", description:"펀드에 대한 설명 4"}
        ];

        this.topFund = $(".top-fund-list");
        this.topFundList = [];
        this.fundDataList.forEach(x => {
            let fundBox = $(`<div class="fund-box"></div>`).appendTo(this.topFund);
            
            this.topFundList.push(new Fund(fundBox, x));
        });
    }

    eventHandle(){
        $(window).on("resize", e=> this.resize() );
    }

    resize() {
        this.sectionList.height(window.innerHeight);
    }
}