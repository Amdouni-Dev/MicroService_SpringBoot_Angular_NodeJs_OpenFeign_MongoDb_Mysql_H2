import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddComponent} from "./add/add.component";
import {ConfirmationDialogComponent } from '../Blog/confirmation-dialog/confirmation-dialog.component';
import { ListOfOrganizationsComponent } from './list-of-organizations/list-of-organizations.component';

const routes: Routes=[
  {path:"", component:ListOfOrganizationsComponent},
    {path:"addP", component:AddComponent},
    {path:"dialog", component: ConfirmationDialogComponent}
]

@NgModule({
  imports: [CommonModule,
      RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class EquipeRoutingModule { }
