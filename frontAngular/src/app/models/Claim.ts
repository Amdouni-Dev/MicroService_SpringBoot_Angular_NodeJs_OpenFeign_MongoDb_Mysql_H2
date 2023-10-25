export class Claim {
    id: number;
    subject : string;
    content : string;
    claimDate : Date;
    status : string;
}


export enum Status {
    PENDING = 'PENDING',
    INPROGRESS = 'INPROGRESS',
    RESOLVED = 'RESOLVED'
}
