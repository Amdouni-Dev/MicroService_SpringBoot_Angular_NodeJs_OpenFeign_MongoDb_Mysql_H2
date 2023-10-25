import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListOfObjectsComponent } from '../list-of-objects/list-of-objects.component';
import { Object } from 'app/models/Object';
import { ObjectService } from 'app/Services/ObjectService/objectservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  objectForm: FormGroup;
 
 
  object:Object;
  Objects:Object[]=[]
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
selected: Date | null;
    @Output()list=new EventEmitter()

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<ListOfObjectsComponent>,
              private serviceC:ObjectService,private _routerUp: Router ) { }

 
   
  ngOnInit(): void {
      this.serviceC.getAllObjects().subscribe((data)=>{
          console.log(data)
      })

      this.objectForm = this._formBuilder.group({
        userId: ['', Validators.required],
        name: ['', Validators.required], 
        description: ['', Validators.required],
        category: ['', Validators.required],
        expirationDate: ['', Validators.required],
        status: ['', Validators.required],
     
      });

     


     

  }

  submit(f:any){
      this.object=f;
     this.serviceC.saveObject(this.object).subscribe((c)=>{
         this.list.emit(this.object);
         this.reloadComponent();
         console.log("Success !", c)
     });
      this.dialogRef.close()
      console.log('A new object added to the database');
      console.log("*****",f)
      this.dialogRef.close(`${f}`);
  }
  reloadComponent() {
    this._routerUp.routeReuseStrategy.shouldReuseRoute = () => false;
    this._routerUp.onSameUrlNavigation = 'reload';
    this._routerUp.navigate(['/Object']);

}

}interface Category {
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

