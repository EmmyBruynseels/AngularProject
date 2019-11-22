import { User } from './user.model';

export class Friend {
    constructor(public friendID: number,public senderID: number,public ontvangerID: number, public accepted: boolean, public sender : User, public ontvanger: User){
    }
}
export class Friend_dto {
    constructor(public senderID: number,public ontvangerID: number, public accepted: boolean){
    }
}