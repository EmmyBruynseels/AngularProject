export class User {
    constructor(public userID: number,public username: string ,  public email: string,public password: string, public token: string){
    }
}


export class User_dto {
    constructor(public username: string, public email: string,public password: string){
    }
}
