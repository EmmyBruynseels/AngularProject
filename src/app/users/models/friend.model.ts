import { User } from './user.model';

export class Friend {
    constructor(public senderID: number,public ontvangerID: number, public accepted: boolean, public sender : User, public ontvanger: User){
    }
}
export class Friend2 {
    constructor(public senderID: number,public ontvangerID: number, public accepted: boolean){
    }
}