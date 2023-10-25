import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Claim, Status} from '../../../models/Claim';
import {ClaimService} from '../../../Services/ClaimService/claim.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ListOfClaimsComponent} from '../list-of-claims/list-of-claims.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})
export class AddClaimComponent implements OnInit {
  claimForm: FormGroup;
  claim:Claim;

  @Output()list=new EventEmitter()

  constructor(private claimService:ClaimService, private _routerUp: Router, private dialogRef: MatDialogRef<ListOfClaimsComponent>,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.claimForm = this._formBuilder.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
    })
  }



  submit(f:any){
    this.claim=f;
    const currentDate = new Date();
    this.claim.claimDate=currentDate;
    this.claim.status= Status.PENDING;
    this.claimService.saveClaim(this.claim).subscribe((c)=>{
      this.list.emit(this.claim);
      this.reloadComponent()
      console.log("Success !", c)
    });
    this.dialogRef.close()
    console.log('A new project added to the database');
    console.log("*****",f)
    this.dialogRef.close(`${f}`);
  }


  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Claim']);

  }
}
