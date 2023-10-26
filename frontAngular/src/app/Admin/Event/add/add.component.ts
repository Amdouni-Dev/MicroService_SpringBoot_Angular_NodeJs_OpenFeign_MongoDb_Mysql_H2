import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Event } from 'app/models/Event';
import { ListOfEventsComponent } from '../list-of-equipes/list-of-events.component';
import { EventService } from 'app/Services/ServicesEvent/event.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    eventForm: FormGroup;
    event: Event;
    private dateString = "2023-10-21T10:00:00";
    private dateObject = new Date(this.dateString);

    @Output() list = new EventEmitter();

    constructor(
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ListOfEventsComponent>,
        private serviceC: EventService,
        private _routerUp: Router
    ) {}

    niveaux: Specialite[] = [
        { value: 'JUNIOR', viewValue: 'JUNIOR' },
        { value: 'SENIOR', viewValue: 'SENIOR' },
        { value: 'EXPERT', viewValue: 'EXPERT' },
    ];


    ngOnInit(): void {
        this.event = {
            id:70,
            nomEvent: 'Nom par défaut',
            lieu: 'Lieu par défaut',
            description: 'Description par défaut',
            start: this.dateObject, // Date actuelle
            end: this.dateObject,   // Date actuelle
        };

        this.eventForm = this._formBuilder.group({
            nomEvent: [this.event.nomEvent, Validators.required],
            lieu: [this.event.lieu],
            description: [this.event.description],
            start: [this.event.start, Validators.required],
            end: [this.event.end, Validators.required],
        });
    }

    submit() {
        this.event = this.eventForm.value;
        this.serviceC.saveEvent(this.event).subscribe((c) => { 
            this.list.emit(this.event);
            this.reloadComponent();
            console.log('Success !', c);
        });
        this.dialogRef.close();
    }

    reloadComponent() {
        this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
        this._routerUp.onSameUrlNavigation = 'reload';
        this._routerUp.navigate(['/Event']);
    }
}

interface Specialite {
    value: string;
    viewValue: string;
}
