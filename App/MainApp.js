import $ from 'jquery';
import Fund from './Fund';

export default class MainApp {
    constructor() {
        this.sectionList = $("section");
        this.currentSection = 0;
        this.scrolling = false;

        this.fundDataList = [
            { title: "시험펀드1", description: "펀드에 대한 설명 1", percent: 43 },
            { title: "시험펀드2", description: "펀드에 대한 설명 2", percent: 75 },
            { title: "시험펀드3", description: "펀드에 대한 설명 3", percent: 50 },
            { title: "시험펀드4", description: "펀드에 대한 설명 4", percent: 84 },
            { title: "시험펀드5", description: "펀드에 대한 설명 5", percent: 20 }
        ];

        this.topFund = $(".top-fund-list");
        this.topFundList = [];
        this.fundDataList.forEach(x => {
            let fundBox = $(`<div class="fund-box"></div>`).appendTo(this.topFund);
            //제이쿼리 객체에서 분리해서 일반 DOM만 보낸다.
            this.topFundList.push(new Fund(fundBox[0], x));
        });

        this.eventHandle();
        this.resize();
    }

    eventHandle() {
        $(window).on("resize", e => this.resize());
        window.addEventListener("wheel", e => this.scroll(e));
        //$(window).on("wheel", e => this.scroll(e));
    }

    resize() {
        this.sectionList.height(window.innerHeight);
        this.topFundList.forEach(x => x.resize());
    }

    scroll(e) {
        if(this.scrolling) return;
        
        let next = null;
        if (e.deltaY > 0) {
            //스크롤이 내려가는 중
            if (this.currentSection >= this.sectionList.length - 1) return; //마지막이라면 무시
            this.currentSection++;
            next = this.sectionList.eq(this.currentSection).offset().top;
        } else {
            //스크롤이 올라가는중
            if (this.currentSection <= 0) return; //처음이라면 무시
            this.currentSection--;
            next = this.sectionList.eq(this.currentSection).offset().top;
        }
        if (next != null) {
            this.scrolling = true;
            $("html, body").stop().animate({ "scrollTop": next }, 1500, "swing", ()=>{
                this.scrolling = false;    
            });
            this.beforeTop = next;

            if(this.currentSection == 1){ //펀드 리스트를 보는 곳에 도달했다면  
                this.topFundList.forEach(x => x.animateDraw() );
            }
        }
    }
}