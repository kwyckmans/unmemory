import './styles/global.css';
import * as _ from "lodash";

console.log("Hello world!")

export default class Main {
    constructor(){
        //console.log("Hello world!");
        let padded_world = _.padStart("Hello world!", 20, "*");
        console.log(padded_world);
    }
}

let start = new Main();