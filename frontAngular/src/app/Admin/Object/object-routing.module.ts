import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListOfObjectsComponent} from "./list-of-objects/list-of-objects.component";
import {AddComponent} from "./add/add.component";
import { ConfirmationDialogComponent } from '../Blog/confirmation-dialog/confirmation-dialog.component';

const routes: Routes=[
  {path:"", component:ListOfObjectsComponent},
    {path:"addP", component:AddComponent},
    {path:"dialog", component: ConfirmationDialogComponent}
]

@NgModule({
  imports: [CommonModule,
      RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ObjectRoutingModule { }
