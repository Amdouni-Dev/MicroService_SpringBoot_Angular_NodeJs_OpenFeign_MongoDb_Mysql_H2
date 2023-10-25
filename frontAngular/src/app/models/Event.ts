export class Event {
    id: number;
    nomEvent: string;
    lieu: string;
    description: string;
    start: Date;
    end: Date;

    constructor(id: number, nomEvent: string, lieu: string, description: string, start: Date, end: Date) {
        this.id = id;
        this.nomEvent = nomEvent;
        this.lieu = lieu;
        this.description = description;
        this.start = start;
        this.end = end;
    }
}
