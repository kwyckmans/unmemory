import * as card from '../../assets/card.jpg';
import Board from '../board';

export class Card {
    cardFinished(): any {
        this.finished = true;
        this.board.finishCard(this.index);
        // let modal = document.getElementById("cardDetail");
        // modal.style.display = "none";

        // let details = document.getElementById("cardContent");
        // details.removeChild(document.getElementById("detailsWrapper"));

        // let card = document.getElementById("card" + this.index.toString());
        // card.style.visibility = "hidden";
    }

    showCard(): any {
        
        let modalContent = document.getElementById("cardContent");
        modalContent.appendChild(this.getDetail());

        let modal = document.getElementById("cardDetail");
        modal.style.display = 'block';
    }
    private visuals: HTMLElement;
    private finished: Boolean = false;


    get isFinished() : Boolean { return this.finished; }

    private constructor(
        private score: number,
        private text: string,
        private title: string,
        private index: number,
        private board: Board

    ){
        this.visuals =  document.createElement('div');
        this.visuals.setAttribute("src", card);
        this.visuals.className = 'card';
        this.visuals.id = "card" + this.index.toString();
        
        this.visuals.addEventListener("click", (e: Event) => this.showCard());

    }

    get getHtml() : HTMLElement { return this.visuals; }

    static fromType(type: CardType, index:number, board:Board)
    {  
        switch (type) {
            case CardType.DRINK_ONE:
                return new Card(1, CardType.DRINK_ONE, "Drink!", index, board);    
            case CardType.DRINK_AD_FUNDUM:
                return new Card(-3, CardType.DRINK_AD_FUNDUM, "Drink!", index, board);    
            default:
                break;
        }
    }

    public toString = (): string => {
        return `${this.text} - ${this.score}`;
    }

    private getDetail() : HTMLElement {
        console.log("Generating details");
        let details = document.createElement("div");
        details.id = "detailsWrapper";
        
        let title = document.createElement("h2");
        title.textContent = "Drink!";

        let contents = document.createElement("p");
        contents.textContent = this.text;

        let score = document.createElement("span");
        score.textContent = this.score.toString();

        console.log("Constructing element");
        details.appendChild(title);
        details.appendChild(contents);
        details.appendChild(score);
        
        console.log("Adding button");
        // let cancelButton = document.createElement("button");
        let confirmButton = document.createElement('button');
        confirmButton.setAttribute("type", "button");
        confirmButton.className = "btn btn-success";
        confirmButton.textContent = "Done!";
        confirmButton.addEventListener("click", (e: Event) => this.cardFinished());

    
        console.log("Appending to parent div");
        details.appendChild(confirmButton);
        return details
    }
    
}

export enum CardType {
    DRINK_ONE="Drink 1 slok",
    DRINK_AD_FUNDUM="Drink 1 ad fundum"
}