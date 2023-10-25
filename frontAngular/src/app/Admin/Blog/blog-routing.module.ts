import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListOfBlogsComponent} from "./list-of-blogs/list-of-blogs.component";
import {AddComponent} from "./add/add.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";

const routes: Routes=[
  {path:"", component:ListOfBlogsComponent},
    {path:"addP", component:AddComponent},
    {path:"dialog", component: ConfirmationDialogComponent}
]

@NgModule({
  imports: [CommonModule,
      RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class BlogRoutingModule { }
