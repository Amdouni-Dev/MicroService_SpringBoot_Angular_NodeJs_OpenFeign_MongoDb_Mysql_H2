import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8180/auth',
                realm: 'Demo-Realm',
                clientId: 'angular-web-client',
            },
            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25
            },
            loadUserProfileAtStartUp: true
        });
}