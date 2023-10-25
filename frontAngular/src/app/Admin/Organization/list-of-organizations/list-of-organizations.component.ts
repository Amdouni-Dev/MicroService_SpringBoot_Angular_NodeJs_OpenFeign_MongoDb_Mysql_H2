import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";

import {Router} from "@angular/router";
import {FormBuilder, FormControl } from '@angular/forms';
import {map, startWith} from "rxjs/operators";
import {combineLatest, filter, Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../../Blog/confirm-dialog/confirm-dialog.component';
import {AddComponent} from "../add/add.component";

import {ConfirmDialogModel} from "../../Blog/confirmation-dialog/confirmation-dialog.component";

import { Organization } from 'app/models/Organization';
import { OrganizationserviceService } from 'app/Services/ServicesOrganization/organizationservice.service';

@Component({
  selector: 'app-list-of-organizations',
  templateUrl: './list-of-organizations.component.html',
  styleUrls: ['./list-of-organizations.component.scss']
})


export class ListOfOrganizationsComponent implements OnInit {

  @NgModule({
    declarations: [ListOfOrganizationsComponent],
    exports: [ListOfOrganizationsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })

  filterText: string='';

  fileNameDialogRef: MatDialogRef<AddComponent>;

  showUpdate=false;
  clickedAdd : boolean = false;
  organizationBinding: any;

  searchText:string='';
  result: boolean;

  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'dd-MM-yyyy', 'en-US');

  organizations: Organization[]=[];
  nbrp: number = 1;
  totalElements: any;
  pageIndex: any;
  pageSize: any;


  constructor(private router: Router,private serviceC: OrganizationserviceService, private formBuilder: FormBuilder,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.ListOfOrganizations({page:"0", size:"5"})
   
  }
  
  showUpdateForm(f:any){
    this.organizationBinding=f;
    this.showUpdate=true;
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="25%";
    this.fileNameDialogRef = this.dialog.open(AddComponent, dialogConfig)
    //this.clickedAdd=true;
  }

  
  $event: any;


  /*****************************SEARCH************************************/

  onSearchTextEntered(searchValue:string) {
    this.searchText = searchValue;
    console.log(this.searchText)
    console.log(this.pageSize)
  }


  /*****************************Liste Des Organisations********************************/
  ListOfOrganizations(request){
    this.serviceC.getOrganizations().subscribe((data)=>{
      this.organizations=data;
      this.totalElements=data['totalElements']
      this.pageIndex = data['number']
      this.pageSize = data['size'];
      console.log(data);
    },error=>{
      console.log(error)
      this.router.navigate(['/errorPage'])
    });}

  /*****************************Supprimer Contrat********************************/
  confirmDialog(id:any) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);


    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData, id
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(dialogResult)
      if (this.result==true){
        this.serviceC.deleteOrganization(id).subscribe((d)=>{
          this.ListOfOrganizations(null)
          console.log("done")
        })
      }
    });
  }


  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.ListOfOrganizations(request);
  }

  addOrganization(e:Organization) {
    this.organizations.push(e);
  }
}
