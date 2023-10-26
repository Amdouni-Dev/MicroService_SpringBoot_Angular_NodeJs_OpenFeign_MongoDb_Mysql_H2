import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
     user: any;
    constructor(
        protected readonly router: Router,
        protected readonly keycloak: KeycloakService
    ) {
        super(router, keycloak);
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url,
            });
        }
        const requiredRoles = route.data.roles;

        // Allow the user to proceed if no additional roles are required to access the route.
        if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
            // Get user information from Keycloak and store it in sessionStorage
            this.user = await this.keycloak.loadUserProfile();
            window.sessionStorage.setItem('USER_KEY', JSON.stringify(this.user));
                this.saveUser(this.keycloak);
            return true;
        }
       
        return requiredRoles.every((role) => this.roles.includes(role));
        
    }
    public saveUser(keycloakService:KeycloakService): void {
        window.sessionStorage.setItem("username", JSON.stringify(this.user));
       if (keycloakService.getUserRoles().includes("user-role")) {

    window.sessionStorage.removeItem("USER_KEY");
        window.sessionStorage.setItem("USER_KEY", "user");
    
  } else {
    window.sessionStorage.removeItem("USER_KEY");
        window.sessionStorage.setItem("USER_KEY", "admin");
  }
       
      }

    public getRole(): any {
        const user = window.sessionStorage.getItem("USER_KEY");
        if (user) {
          return user;
        }
    
        return null;
      }
}
