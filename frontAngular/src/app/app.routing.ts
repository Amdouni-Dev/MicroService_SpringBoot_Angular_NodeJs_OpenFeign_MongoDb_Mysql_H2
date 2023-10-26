import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./utility/app.guard";

const routes: Routes = [
  {path: "",redirectTo: "welcome", pathMatch: "full",},

  {path: "",component: AdminLayoutComponent,children: [{path: "",loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then((m) => m.AdminLayoutModule),canActivate: [AuthGuard]},],
  },
  { path: 'welcome', loadChildren: () => import('./Admin/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./Admin/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },


  {path: "Object",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
  import("./Admin/Object/object.module").then((m) => m.ObjectModule),canActivate: [AuthGuard]},],
},
{path: "Blog",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
import("./Admin/Blog/blog.module").then((m) => m.BlogModule), canActivate: [AuthGuard]},],
},
 

{path: "Claim",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
          import("./Admin/Claim/claim.module").then((m) => m.ClaimModule), canActivate: [AuthGuard] ,data: {
            roles: ['admin'] 
          }},],
  },


  {path: "Event",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
          import("./Admin/Event/equipe.module").then((m) => m.EquipeModule), canActivate: [AuthGuard] ,},],
  },

  {path: "Organization",component: AdminLayoutComponent,children: [{path: "",loadChildren: ()=>
  import("./Admin/Organization/organization.module").then((m) => m.OrganizationModule), canActivate: [AuthGuard]},],
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


// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from '../app/utility/app.guard';

// const routes: Routes = [
//   { path: '', redirectTo: 'welcome', pathMatch: 'full' },
//   { path: 'welcome', loadChildren: () => import('./Admin/home/home.module').then(m => m.HomeModule) },
//  { path: 'profile', loadChildren: () => import('./Admin/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
