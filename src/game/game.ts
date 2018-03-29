import { Player } from "./player";
import { Card } from "./cards/card";

export class Game {
    players: Array<Player> = new Array();
    playersList: HTMLElement = document.getElementById("players");

    constructor() {
        console.log("Starting unmemory");

        let addPlayerBtn = document.getElementById("add-player");
        let startGameBtn = document.getElementById("start-game");

        let newPlayerInput = (<HTMLInputElement>document.getElementById("new-player"));

        addPlayerBtn.addEventListener("click", (e: Event) => this.addPlayer(new Player(newPlayerInput.value)));
        startGameBtn.addEventListener("click", (e: Event) => this.start());
    }

    public addPlayer(player: Player) {
        this.players.push(player);
        this.addPlayerToList();
        this.clearNewPlayerField();
        console.log(`Added player ${player}`);
    }

    public start() {
        let registrationScreen = document.getElementById("registration");
        registrationScreen.style.display = "none";

        let gameScreen = document.getElementById("game-screen");
        gameScreen.style.display = "block";
        
        let card1 = new Card(1, "hello");
        gameScreen.appendChild(card1.getHtml);
    }

    private clearNewPlayerField(){
        let inputElement = (<HTMLInputElement>document.getElementById("new-player"));
        inputElement.value = "";
        inputElement.focus();
        inputElement.select();
    }

    private addPlayerToList(){
        let listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(this.players.slice(-1)[0].name));
        this.playersList.appendChild(listElement);
    }
}