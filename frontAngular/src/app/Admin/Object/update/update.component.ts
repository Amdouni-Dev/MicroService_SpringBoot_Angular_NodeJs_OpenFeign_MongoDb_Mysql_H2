import {Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {ContratService} from "../../../Services/ContratService/contrat.service";
import {Contrat} from "../../../models/Contrat";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ObjectService } from 'app/Services/ObjectService/objectservice.service';
import { Object } from 'app/models/Object';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Output() requested = new EventEmitter<any>();
  @Input()ctrct:any;
  objectForm: FormGroup;
  categories:Category[]= [
    {value: 'ELECTRONIQUE', viewValue: 'ELECTRONIQUE'},
    {value: 'VETEMENTS', viewValue: 'VETEMENTS'},
    {value: 'MEUBLES', viewValue: 'MEUBLES'},
    {value: 'LIVRES', viewValue: 'LIVRES'},
    {value: 'AUTRE', viewValue: 'AUTRE'}
];
status:Status[]= [
  {value: 'DISPONIBLE', viewValue: 'DISPONIBLE'},
  {value: 'NONDISPONIBLE', viewValue: 'NONDISPONIBLE'},
];

  constructor(private cService: ObjectService, private _formBuilder:FormBuilder,private _routerUp: Router) { }

  ngOnInit(): void {


    this.objectForm = this._formBuilder.group({
      userId: ['', Validators.required],
      category: ['', Validators.required], 
      description: ['', Validators.required],
      name: ['', Validators.required],
      expirationDate: [null, Validators.required], 
      status: ['', Validators.required]
    })

  

  }

  
  updateObject(o:Object){
    this.cService.updateObject(this.ctrct.id, o).subscribe((data)=>{
      console.log(data);
      this.reloadComponent();
    })
  }
  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Object']);

}
}
interface Category {
  value: string;
  viewValue: string;
}
interface Status {
  value: string;
  viewValue: string;
}
interface Pokemon {
  value: string;
  viewValue: string;
}

interface PrixGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

