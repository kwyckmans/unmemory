import { Player } from "./player";
import { Card } from "./cards/card";
import Board from "./board";

export class Game {
    static MAX_ROUNDS = 3;

    players: Array<Player> = new Array();
    playersList: HTMLElement = document.getElementById("players");

    board: Board;

    round: number = 1;

    private gameScreen = document.getElementById("game-screen");

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

        this.gameScreen.style.display = "block";
        
        this.board = new Board(this.players.length, this.round, this);
        this.gameScreen.appendChild(this.board.getHtml());
    }

    public finishRound(){
        this.round++;
        // let board = document.getElementById("gameBoard");

        // while(board.firstChild){
        //     board.removeChild(board.firstChild);
        // }
        console.log("Round is finished");
        if(this.round > Game.MAX_ROUNDS){
            console.log("Game is finished!");
        }else {
            this.gameScreen.removeChild(document.getElementById("gameBoard"))

            this.board = new Board(this.players.length, this.round, this);
            this.gameScreen.appendChild(this.board.getHtml());
        }
        
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