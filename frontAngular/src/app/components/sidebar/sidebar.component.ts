import { Component, OnInit } from "@angular/core";

declare const $: any;
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

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
