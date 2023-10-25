import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClaimService} from '../../../Services/ClaimService/claim.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ListOfClaimsComponent} from '../list-of-claims/list-of-claims.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Claim} from '../../../models/Claim';
import {Contrat} from '../../../models/Contrat';

@Component({
  selector: 'app-update-claim',
  templateUrl: './update-claim.component.html',
  styleUrls: ['./update-claim.component.scss']
})
export class UpdateClaimComponent implements OnInit {
  @Output() requested = new EventEmitter<any>();
  @Output()list=new EventEmitter()

  @Input()ctrct:any;

  claimForm: FormGroup;
  claim:Claim;
  constructor(private claimService:ClaimService, private _routerUp: Router, private dialogRef: MatDialogRef<ListOfClaimsComponent>,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.claimForm = this._formBuilder.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
    })
  }
  updateClaim(c:Claim){
    console.log(this.ctrct.id)
    this.claimService.updateClaim(this.ctrct.id, c).subscribe((data)=>{
      console.log(data);
      this.reloadComponent();

    })
  }
  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Claim']);

  }

}
