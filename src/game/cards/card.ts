import * as card from '../../assets/card.jpg';
import Board from '../board';

export class Card {
    cardFinished(e: Event): any {
        this.finished = true;
        this.board.addScoreToPlayer(this.score);
        this.board.finishCard(this.index);
        e.preventDefault();
    }

    showCard(): any {

        let modalContent = document.getElementById("cardContent");
        modalContent.appendChild(this.getDetail());

        let modal = document.getElementById("cardDetail");
        modal.style.display = 'block';
    }
    private visuals: HTMLElement;
    private finished: Boolean = false;


    get isFinished(): Boolean { return this.finished; }

    private constructor(
        private score: number,
        private text: string,
        private title: string,
        private index: number,
        private board: Board

    ) {
        this.visuals = document.createElement('div');
        let cardBack = document.createElement('img');
        this.visuals.appendChild(cardBack);
        cardBack.setAttribute("src", card);
        
        this.visuals.className = 'card';
        this.visuals.id = "card" + this.index.toString();

        this.visuals.addEventListener("click", (e: Event) => this.showCard());

    }

    get getHtml(): HTMLElement { return this.visuals; }

    static fromType(type: CardType, index: number, board: Board) {
        switch (type) {
            case CardType.DRINK_ONE:
                return new Card(-1, CardType.DRINK_ONE, "Drink!", index, board);
            case CardType.DRINK_AD_FUNDUM:
                return new Card(-6, CardType.DRINK_AD_FUNDUM, "Drink!", index, board);
            case CardType.DRINK_TWO:
                return new Card(-2, CardType.DRINK_TWO, "Drink!", index, board);
            case CardType.DRINK_THREE:
                return new Card(-3, CardType.DRINK_THREE, "Drink!", index, board);
            case CardType.AWKWARD_KISS:
                return new Card(1, CardType.AWKWARD_KISS, "Liefde!", index, board);
            case CardType.DRINKING_BUDDY:
                return new Card(6, CardType.DRINKING_BUDDY, "Samen zuipen!", index, board);
            case CardType.GIVE_FIVE:
                return new Card(5, CardType.GIVE_FIVE, "Divide and conquer!", index, board);
            case CardType.GIVE_FOUR:
                return new Card(4, CardType.GIVE_FOUR, "Divide and conquer!", index, board);
            case CardType.GIVE_SIX:
                return new Card(6, CardType.GIVE_SIX, "Divide and conquer!", index, board);
            case CardType.PANTS_OFF:
                return new Card(3, CardType.PANTS_OFF, "Do the Dave!", index, board);
            default:
                break;
        }
    }

    public toString = (): string => {
        return `${this.text} - ${this.score}`;
    }

    private getDetail(): HTMLElement {
        let details = document.createElement("div");
        details.id = "detailsWrapper";

        let title = document.createElement("h2");
        title.textContent = "Drink!";

        let contents = document.createElement("p");
        contents.textContent = this.text;

        let score = document.createElement("span");
        score.textContent = this.score.toString();

        details.appendChild(title);
        details.appendChild(contents);
        details.appendChild(score);

        // let cancelButton = document.createElement("button");
        let confirmButton = document.createElement('button');
        confirmButton.setAttribute("type", "button");
        confirmButton.className = "btn btn-success";
        confirmButton.textContent = "Done!";
        confirmButton.addEventListener("click", (e: Event) => this.cardFinished(e));


        details.appendChild(confirmButton);
        return details
    }

}

export enum CardType {
    DRINK_ONE = "Drink 1 slok",
    DRINK_TWO = "Drink 2 slokken",
    DRINK_THREE = "Drink 3 slokken",
    DRINKING_BUDDY = "Kies een drinkingbuddy voor de rest van het spel",
    AWKWARD_KISS = "Gief iemand in de groep een kusje",
    PANTS_OFF = "Doet u broek uit",
    GIVE_FOUR = "Deel 4 slokken uit",
    GIVE_FIVE = "Deel 5 slokken uit",
    GIVE_SIX = "Deel 6 slokken uit",
    DRINK_AD_FUNDUM = "Drink 1 ad fundum"
}