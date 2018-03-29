import * as card from '../../assets/card.jpg';

export class Card {
    private visuals: HTMLElement;

    constructor(
        private score: number,
        private text: string,
    ){
        this.visuals =  document.createElement('img');
        this.visuals.setAttribute("src", card);
    }

    get getHtml() : HTMLElement { return this.visuals; }
}