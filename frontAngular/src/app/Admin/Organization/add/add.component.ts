import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListOfOrganizationsComponent } from '../list-of-organizations/list-of-organizations.component';
import { OrganizationserviceService } from 'app/Services/ServicesOrganization/organizationservice.service';
import { Organization } from 'app/models/Organization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  organizationForm: FormGroup;
  organization:Organization;

selected: Date | null;
    @Output()list=new EventEmitter()

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<ListOfOrganizationsComponent>,
              private serviceC:OrganizationserviceService,private _routerUp: Router) { }

    organizations:Organization[]=[]

  ngOnInit(): void {
      this.serviceC.getOrganizations().subscribe((data)=>{
          console.log(data)
      })

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
 
  submit(f:any){
      this.organization=f;
      this.organization.archived=false;
      this.organization.foundingDate=new Date('2023-04-22');
      this.organization.logo='image.png';
     this.serviceC.saveOrganization(this.organization).subscribe((c)=>{
         this.list.emit(this.organization);
         this.reloadComponent()
         console.log("Success !", c)
     });
      this.dialogRef.close()
      console.log('A new organization added to the database');
      console.log("*****",f)
      this.dialogRef.close(`${f}`);
  }
  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Organization']);

}

}

