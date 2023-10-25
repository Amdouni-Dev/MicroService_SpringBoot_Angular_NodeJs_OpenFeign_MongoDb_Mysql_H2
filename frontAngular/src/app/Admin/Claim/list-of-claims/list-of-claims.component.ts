import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClaimService} from '../../../Services/ClaimService/claim.service';
import {Claim} from '../../../models/Claim';
import {formatDate} from '@angular/common';
import {PageEvent} from '@angular/material/paginator';
import {filter} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AddClaimComponent} from '../add-claim/add-claim.component';
import { ConfirmDialogComponent } from 'app/Admin/Blog/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'app/Admin/Blog/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-list-of-claims',
  templateUrl: './list-of-claims.component.html',
  styleUrls: ['./list-of-claims.component.scss']
})
export class ListOfClaimsComponent implements OnInit {

  clickedAdd : boolean = false;
  showUpdate=false;
  contractBinding: any;
  claims:Claim[]=[];
  totalElements: any;
  pageIndex: any;
  pageSize: any;
  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'dd-MM-yyyy', 'en-US');
  filterText: string='';
  fileNameDialogRef: MatDialogRef<AddClaimComponent>;
  result: boolean;

  constructor(private router: Router, private claimService:ClaimService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ListOfClaims({page:"0", size:"5"});

  }

  onCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.width="25%";
    this.fileNameDialogRef = this.dialog.open(AddClaimComponent, dialogConfig)
  }


  getStatusBadgeClass(status: string): any {
    let badgeClass: string;

    switch (status) {
      case 'PENDING':
        badgeClass = 'badge badge-danger'; // Classe Bootstrap pour PENDING
        break;
      case 'INPROGRESS':
        badgeClass = 'badge badge-warning'; // Classe Bootstrap pour INPROGRESS
        break;
      case 'RESOLVED':
        badgeClass = 'badge badge-success'; // Classe Bootstrap pour RESOLVED
        break;
      default:
        badgeClass = 'badge badge-dark'; // Classe Bootstrap par défaut
        break;
    }

    return badgeClass;
  }
  /*****************************Liste Des Claims********************************/
  ListOfClaims(request){
    this.claimService.getAllClaims().subscribe((data)=>{
      // console.log("hello world !")

      this.claims=data;
      this.totalElements=data['totalElements']
      this.pageIndex = data['number']
      this.pageSize = data['size'];
      // console.log("heloooooooooooooooooooo",data);
    },error=>{
      console.log(error)
      this.router.navigate(['/errorPage'])
    });}


  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.ListOfClaims(request);
  }


   readonly filter = filter;


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
        this.claimService.deleteClaim(id).subscribe((d)=>{
          this.ListOfClaims(null)
          console.log("done")
        })
      }
    });
  }
  showUpdateForm(f:any){
    this.contractBinding=f;
    this.showUpdate=true;
  }

  addContrat(c:Claim) {
    this.claims.push(c);
  }
}

