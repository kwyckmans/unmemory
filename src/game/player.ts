export class Player{
    resetScore(): any {
        this._score = 0;
    }
    addScore(score: number): any {
        this._score += score;
    }
    constructor(
        private _name:string,
        private _score:number
    ){}

    get name() : string { return this._name }
    get score() : number { return this._score }
    public toString = () : string => {
        return `${this.name} - ${this.score}`
    }
}