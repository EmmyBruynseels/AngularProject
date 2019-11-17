import { Poll } from './poll.model';
import { Stem_dto } from './stem.model';

export class Antwoord {
    constructor(public antwoordID: number ,public naam: string, public poll : Poll){
    }
}
export class Antwoord_dto {
    constructor(public naam: string, public pollID : number, public stemmen : Stem_dto[]){
    }
}
export class Antwoord_dto2 {
    constructor(public naam: string, public pollID : number){
    }
}
