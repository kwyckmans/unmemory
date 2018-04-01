import { Player } from "./player";
import { Card } from "./cards/card";
import Board from "./board";
import * as rainbow from '../assets/rainbow.mp3';
import { shuffle } from "lodash";
import * as turbo from '../assets/turbo.mp3';
import * as kombat from '../assets/kombat.mp3';
import * as awesome from '../assets/awesome.mp3';

export class Game {
    addScoreToPlayer(score: number): any {
        console.log(`Adding ${score} to ${this.curPlayer}`);
        this.curPlayer.addScore(score);
    }
    static MAX_ROUNDS = 3;

    players: Array<Player> = new Array();
    finishedPlayers: Array<Player> = new Array();

    playersList: HTMLElement = document.getElementById("players");

    board: Board;

    round: number = 1;

    private gameScreen = document.getElementById("game-screen");
    private finishedScreen = document.getElementById("finishedScreen");

    private curPlayerDiv = document.getElementById("curPlayer");

    private endOfRoundDiv = document.getElementById("endOfRound");

    private curPlayer: Player;

    private gameSong: HTMLAudioElement = new Audio(kombat);

    private titleSong: HTMLAudioElement = new Audio(awesome);

    constructor() {
        console.log("Starting unmemory");

        let addPlayerBtn = document.getElementById("add-player");
        let startGameBtn = document.getElementById("start-game");

        let newPlayerInput = (<HTMLInputElement>document.getElementById("new-player"));

        addPlayerBtn.addEventListener("click", (e: Event) => this.addPlayer(new Player(newPlayerInput.value, 0)));
        startGameBtn.addEventListener("click", (e: Event) => this.start());

        this.titleSong.currentTime = 4;
        this.titleSong.play();
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
        // array.splice(Math.floor(Math.random()*array.length), 1);
        this.curPlayer = this.players.splice(Math.floor(Math.random() * this.players.length), 1)[0];
        let curPlayerName = document.createElement("h2");
        curPlayerName.textContent = `Current player: ${this.curPlayer.name}`;
        curPlayerName.id = "curPlayerName";
        this.curPlayerDiv.appendChild(curPlayerName);
        console.log(this.curPlayer, this.players);
        this.titleSong.pause();
        this.gameSong.currentTime = 11;
        this.gameSong.play();
    }

    public finishRound() {
        this.round++;

        console.log("Round is finished");
        if (this.round > Game.MAX_ROUNDS) {
            console.log("Game is finished!");
            this.gameScreen.style.display = "none";
            this.finishedScreen.style.display = "block";
            this.gameSong.pause();
            let audio = new Audio(rainbow);
            audio.play();
        } else {
            

            this.players = new Array();
            let uniqPlayers = this.finishedPlayers.filter((player, index, self) => {
                return self.indexOf(player) === index;
            });

            for(let i = 0; i < this.round; i++){
                shuffle(uniqPlayers).forEach((player) => {
                    this.players.push(player);
                });
            }

            console.log(this.players);
           
            this.finishedPlayers.forEach((player) => {
                player.resetScore();
            })

            let luckiestPlayer = this.finishedPlayers.sort((el1, el2) => {
                if (el1.score > el2.score) return 1;
                if (el1.score < el2.score) return -1;
                return 0;
            })[0];


            this.finishedPlayers = new Array();

            this.gameScreen.removeChild(document.getElementById("gameBoard"))

            this.curPlayer = this.players.splice(Math.floor(Math.random() * this.players.length), 1)[0];
            let curPlayerName = document.createElement("h2");
            curPlayerName.textContent = `Current player: ${this.curPlayer.name}`;
            curPlayerName.id = "curPlayerName";
            this.curPlayerDiv.appendChild(curPlayerName);

            this.endOfRound(luckiestPlayer);
        }

    }

    endOfRound(luckiestPlayer: Player){
        this.gameSong.pause();
        let audio = new Audio(turbo);
        audio.currentTime = 50;
        audio.play();
        this.gameScreen.style.display = "none";
        this.endOfRoundDiv.style.display = "block";
    
        let drinker = document.createElement("p");
        drinker.id = 'luckiestPlayer';
        drinker.textContent = `The luckiest player this round was ${luckiestPlayer.name} with a score of ${luckiestPlayer.score}. Drink an ad fundum!`;
        this.endOfRoundDiv.appendChild(drinker);
        
        let cntButton = document.createElement("button");
        cntButton.setAttribute("type", "button");
        cntButton.textContent = "Next round!";
        cntButton.className = "btn btn-success";
        cntButton.id = "cntButton";
        this.addEndRoundEventListener(cntButton, audio);

        this.endOfRoundDiv.appendChild(cntButton);
    }

    addEndRoundEventListener(element:HTMLButtonElement, audio:HTMLAudioElement){
        element.addEventListener("click", (event) => {
            audio.pause();
            this.startNewRound();
        })
    }
    startNewRound() {
        this.gameScreen.style.display = "block";
        this.endOfRoundDiv.style.display = "none";
        this.endOfRoundDiv.removeChild(document.getElementById("cntButton"));
        this.endOfRoundDiv.removeChild(document.getElementById('luckiestPlayer'));
        this.board = new Board(this.players.length / this.round, this.round, this);
        this.gameScreen.appendChild(this.board.getHtml());
        this.gameSong.currentTime = 11;
        this.gameSong.play();
    }

    playerFinished() {
        console.log(`Player ${this.curPlayer} finished`);
        this.curPlayerDiv.removeChild(document.getElementById("curPlayerName"));
        this.finishedPlayers.push(this.curPlayer);
        this.curPlayer = this.players.splice(Math.floor(Math.random() * this.players.length), 1)[0];
        console.log(`Player ${this.curPlayer} is the new player`);

        if(this.curPlayer){
            let curPlayerName = document.createElement("h2");
            curPlayerName.textContent = `Current player: ${this.curPlayer.name}`;
            curPlayerName.id = "curPlayerName";
            this.curPlayerDiv.appendChild(curPlayerName);
        }
        
    }

    private clearNewPlayerField() {
        let inputElement = (<HTMLInputElement>document.getElementById("new-player"));
        inputElement.value = "";
        inputElement.focus();
        inputElement.select();
    }

    private addPlayerToList() {
        let listElement = document.createElement("li");
        listElement.appendChild(document.createTextNode(this.players.slice(-1)[0].name));
        this.playersList.appendChild(listElement);
    }
}