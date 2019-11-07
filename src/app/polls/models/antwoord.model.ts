import { Poll } from './poll.model';
import { Stem2 } from './stem.model';

export class Antwoord {
    constructor(public antwoordID: number ,public naam: string, public poll : Poll){
    }
}
export class Antwoord2 {
    constructor(public naam: string, public pollID : number, public stemmen : Stem2[]){
    }
}
export class Antwoord3 {
    constructor(public naam: string, public pollID : number){
    }
}
