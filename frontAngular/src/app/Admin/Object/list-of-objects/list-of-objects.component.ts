import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";
import {FormBuilder, FormControl } from '@angular/forms';
import {map, startWith} from "rxjs/operators";
import {combineLatest, filter, Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Object } from 'app/models/Object';
import { ObjectService } from 'app/Services/ObjectService/objectservice.service';
import { ConfirmDialogModel } from 'app/Admin/Blog/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogComponent } from 'app/Admin/Blog/confirm-dialog/confirm-dialog.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { AuthGuard } from 'app/utility/app.guard';
@Component({
  selector: 'app-list-of-objects',
  templateUrl: './list-of-objects.component.html',
  styleUrls: ['./list-of-objects.component.scss']
})


export class ListOfObjectsComponent implements OnInit {

  @NgModule({
    declarations: [ListOfObjectsComponent],
    exports: [ListOfObjectsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })

  filterText: string='';

  fileNameDialogRef: MatDialogRef<AddComponent>;

  showUpdate=false;
  clickedAdd : boolean = false;
 objectBinding: any;

  searchText:string='';
  result: boolean;

  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'dd-MM-yyyy', 'en-US');

  objects: Object[]=[];
 
  nbrp: number = 1;
  totalElements: any;
  pageIndex: any;
  pageSize: any;
  currentUser:any;


  constructor(private router: Router,private serviceC: ObjectService, private formBuilder: FormBuilder,
              private dialog: MatDialog,private auth: AuthGuard) { }


  ngOnInit(): void {
    this.currentUser = this.auth.getRole();
    this.ListOfObjects({page:"0", size:"5"})
   
  }
  
  showUpdateForm(o:any){
    this.objectBinding=o;
    this.showUpdate=true;
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="25%";
    this.fileNameDialogRef = this.dialog.open(AddComponent, dialogConfig)
  
  }

 
  $event: any;


  /*****************************SEARCH************************************/

  onSearchTextEntered(searchValue:string) {
    this.searchText = searchValue;
    console.log(this.searchText)
    console.log(this.pageSize)
  }


  /*****************************Liste Des Contrats********************************/
  ListOfObjects(request){
    this.serviceC.getAllObjects().subscribe((data)=>{
      this.objects=data;
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
        this.serviceC.deleteObject(id).subscribe((d)=>{
          this.ListOfObjects(null)
          console.log("done")
        })
      }
    });
  }


  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.ListOfObjects(request);
  }

  addObject(o:Object) {
    this.objects.push(o);
  }
}
