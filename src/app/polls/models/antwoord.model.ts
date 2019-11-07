import { Poll } from './poll.model';

export class Antwoord {
    constructor(public antwoordID: number ,public naam: string, public poll : Poll){
    }
}
export class Antwoord2 {
    constructor(public naam: string, public pollID : number){
    }
}
