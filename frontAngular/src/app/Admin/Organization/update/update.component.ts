import {Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Organization } from 'app/models/Organization';
import { OrganizationserviceService } from 'app/Services/ServicesOrganization/organizationservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Output() requested = new EventEmitter<any>();
  @Input()ctrct:any;
  organizationForm: FormGroup;


  constructor(private cService:OrganizationserviceService, private _formBuilder:FormBuilder,private _routerUp: Router) { }

  ngOnInit(): void {


    this.organizationForm = this._formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: [''],
      email: [''],
      website: [''],
      description: [''],
     
     
    })

   

  }



  updateOrganization(e:Organization){
    e.archived=false;
    e.foundingDate=new Date('2023-04-22');
    e.logo='image.png';
    this.cService.updateOrganization(this.ctrct.id, e).subscribe((data)=>{
      console.log(data);
      this.reloadComponent();
    })
  }

  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Organization']);

}
}
