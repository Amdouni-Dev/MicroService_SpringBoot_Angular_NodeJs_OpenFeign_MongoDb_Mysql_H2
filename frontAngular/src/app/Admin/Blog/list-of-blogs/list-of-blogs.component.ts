import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {Blog} from "../../../models/Blog";
import {BlogService} from "../../../Services/BlogService/blog.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl } from '@angular/forms';
import {map, startWith} from "rxjs/operators";
import {combineLatest, filter, Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogModel} from "../confirmation-dialog/confirmation-dialog.component";
import {AddComponent} from "../add/add.component";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthGuard } from 'app/utility/app.guard';

@Component({
  selector: 'app-list-of-blogs',
  templateUrl: './list-of-blogs.component.html',
  styleUrls: ['./list-of-blogs.component.scss']
})


export class ListOfBlogsComponent implements OnInit {

  @NgModule({
    declarations: [ListOfBlogsComponent],
    exports: [ListOfBlogsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })

  filterText: string='';

  fileNameDialogRef: MatDialogRef<AddComponent>;

  showUpdate=false;
  clickedAdd : boolean = false;
  blogBinding: any;
  currentUser:any;
  searchText:string='';
  result: boolean;

  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'dd-MM-yyyy', 'en-US');

  blogs: Blog[]=[];
  CNA: Blog[]=[];
  CA: Blog[]=[];
  nbrp: number = 1;
  totalElements: any;
  pageIndex: any;
  pageSize: any;


  constructor(private router: Router,private serviceC: BlogService, private formBuilder: FormBuilder,
              private dialog: MatDialog,private auth: AuthGuard) { }


  ngOnInit(): void {
    this.ListOfBlogs({page:"0", size:"5"})
    this.currentUser = this.auth.getRole();
  }
  
  showUpdateForm(f:any){
    this.blogBinding=f;
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


  /*****************************Liste Des Blogs********************************/
  ListOfBlogs(request){
    this.serviceC.getAllBlogs().subscribe((data)=>{
      this.blogs=data;
      this.totalElements=data['totalElements']
      this.pageIndex = data['number']
      this.pageSize = data['size'];
      console.log(data);
    },error=>{
      console.log(error)
      this.router.navigate(['/errorPage'])
    });}

  /*****************************Supprimer Blog********************************/
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
        this.serviceC.deleteBlog(id).subscribe((d)=>{
          this.ListOfBlogs(null)
          console.log("done")
        })
      }
    });
  }


  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.ListOfBlogs(request);
  }

  addBlog(c:Blog) {
    this.blogs.push(c);
  }
}
