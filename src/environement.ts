export const environement ={
    production:false,
    Keycloak:{
        issuer: 'http://localhost:8080/auth/realms/UniDorms',
        redirectUri: 'http://localhost:4200/front/accueil',
        clientId: 'angular-client',
        scope: 'openid profile email',
        showDebugInformation: true, // pour le débogage, à désactiver en production
    }

}