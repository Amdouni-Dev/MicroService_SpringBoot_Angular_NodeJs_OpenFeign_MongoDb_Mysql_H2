import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddComponent} from "./add/add.component";
import { ListOfEventsComponent } from './list-of-equipes/list-of-events.component';
import { ConfirmationDialogComponent } from '../Blog/confirmation-dialog/confirmation-dialog.component';

const routes: Routes=[
  {path:"", component:ListOfEventsComponent},
    {path:"addP", component:AddComponent},
    {path:"dialog", component: ConfirmationDialogComponent}
]

@NgModule({
  imports: [CommonModule,
      RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class EquipeRoutingModule { }
