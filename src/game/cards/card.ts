import * as cardBack from '../../assets/card.jpg';

export class Card {
    private visuals: HTMLElement;

    constructor(
        private score: number,
        private text: string,
    ){
        this.visuals =  document.createElement('img');
        this.visuals.setAttribute("src", cardBack);
    }

    get visual() : HTMLElement { return this.visuals; }
}