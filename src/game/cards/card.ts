import '../../assets/card.jpg';

export class Card {
    private visuals: HTMLElement;

    constructor(
        private score: number,
        private text: string,
    ){
        this.visuals =  document.createElement('img');
        this.visuals.setAttribute("src", "../../assets/card.jpg");
    }

    get visual() : HTMLElement { return this.visuals; }
}