import { Observable } from "data/observable";
import { handleOpenURL, AppURL } from "nativescript-urlhandler";
import { OidcClient, UserManager } from "oidc-client";


export class HomeViewModel extends Observable {

    keycloakUrl: string;
    callbackUrl: string;

    constructor() {
        super();

        handleOpenURL((appURL: AppURL) => {
            this.callbackUrl = appURL.toString();
            this.set("testUrl", appURL.toString());
            console.log("App URL: " + this.callbackUrl);
        
            // Exchange the Authorization Code for an Access Token
        });

    }

}
