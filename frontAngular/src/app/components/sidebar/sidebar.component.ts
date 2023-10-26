import { Component, OnInit } from "@angular/core";
import { AuthGuard } from "app/utility/app.guard";
import { KeycloakService } from "keycloak-angular";

declare const $: any;
const roleToFind = 'admin-role';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  { path: "/Object", title: "Objects", icon: "extension", class: "" },

  { path: "/Organization", title: "Organizations", icon: "person", class: "" },
  { path: "/Event", title: "Events", icon: "groups", class: "" },

 

  { path: "/Claim", title: "Claims", icon: "apartment", class: "" },

  { path: "/Blog", title: "Blogs", icon: "wysiwyg", class: "" },

  
    

  // {
  //   path: "/table-list",
  //   title: "Table List",
  //   icon: "content_paste",
  //   class: "",
  // },
  // { path: "/Forum/all", title: "Forum", icon: "groups", class: "" },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  email: any;
  username: any;
  usernameObject: any;
  constructor(private keycloakService: KeycloakService,private auth: AuthGuard) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.initializeUserOptions();
    this.username = window.sessionStorage.getItem("username");
    this.usernameObject = JSON.parse(this.username);


  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  user = '';

private initializeUserOptions(): void {
    this.user = this.keycloakService.getUsername();
    console.log(this.keycloakService.getUserRoles());


    if (this.keycloakService.getUserRoles().includes(roleToFind)) {
    
        console.log('C\'est un admin-role');
        
      } else {
        console.log('C\'est un user-role');
      }





  }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }

  
}
