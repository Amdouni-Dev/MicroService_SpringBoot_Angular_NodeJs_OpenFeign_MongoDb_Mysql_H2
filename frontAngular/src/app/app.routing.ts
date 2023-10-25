import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";


const routes: Routes = [
  {path: "",redirectTo: "dashboard",pathMatch: "full",},

  {path: "",component: AdminLayoutComponent,children: [{path: "",loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then((m) => m.AdminLayoutModule),},],
  },
  {path: "Object",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
  import("./Admin/Object/object.module").then((m) => m.ObjectModule),},],
},
{path: "Blog",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
import("./Admin/Blog/blog.module").then((m) => m.BlogModule),},],
},
 

{path: "Claim",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
          import("./Admin/Claim/claim.module").then((m) => m.ClaimModule),},],
  },


  {path: "Event",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
          import("./Admin/Event/equipe.module").then((m) => m.EquipeModule),},],
  },

  {path: "Organization",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
  import("./Admin/Organization/organization.module").then((m) => m.OrganizationModule),},],
  },


];
 
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
