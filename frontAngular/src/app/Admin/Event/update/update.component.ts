import {Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EventService } from 'app/Services/ServicesEvent/event.service';
import { Event } from 'app/models/Event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Output() requested = new EventEmitter<any>();
  @Input()ctrct:any;
  equipeForm: FormGroup;


  constructor(private cService: EventService, private _formBuilder:FormBuilder, private _routerUp: Router) { }

    ngOnInit(): void {
        this.equipeForm = this._formBuilder.group({
            nomEvent: ['', Validators.required],
            lieu: ['', Validators.required],
            description: [''],
            start: ['', Validators.required],
            end: ['', Validators.required],
            // Ajoutez d'autres champs selon vos besoins
        });
    }



  niveaux = [
      {value: 'JUNIOR', viewValue: 'JUNIOR'},
      {value: 'SENIOR', viewValue: 'SENIOR'},
      {value: 'EXPERT', viewValue: 'EXPERT'},

  ];

  updateEquipe(e:Event){
   console.log(e);
    this.cService.updateEvent(this.ctrct.id, e).subscribe((data)=>{
      console.log(data);
      this.reloadComponent();
    })
  }
  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Event']);

}
}
