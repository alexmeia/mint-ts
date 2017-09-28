import { Observable } from "data/observable";
import { handleOpenURL, AppURL } from "nativescript-urlhandler";
import { OidcClient, UserManager } from "oidc-client";

import * as http  from "http";



export class HomeViewModel extends Observable {

    keycloakUrl: string;
    callbackUrl: string;
    accessTokenBody: any;

    constructor() {
        super();

        handleOpenURL((appURL: AppURL) => {

             // Read Authorization code parameter from callback url
            let code = appURL.params.get("code");
            this.callbackUrl = appURL.toString();
            this.set("testUrl", appURL.toString());
            console.log("App URL: " + this.callbackUrl);

            console.log(code);

            let data: string = "grant_type=authorization_code&client_id=nativescript-sample-client&client_secret=22c52bfc-c933-4055-8b88-cd99c2064906&code=" 
                                    + code + "&redirect_uri=it.phoops.mint://test" 

            this.set("authCode", code);
        
            // Exchange the Authorization Code for an Access Token
            let options = { 
                method: "POST",
                url: 'http://keycloak-dev.phoops.it:9876/auth/realms/mint/protocol/openid-connect/token',
                headers: { "content-type": "application/x-www-form-urlencoded" }, // Keycloak needs this content type
                content: data
            };
          
            http.request(options).then((response) => {
                this.set("tokenType", response.content.toJSON().token_type);
                this.set("expiresIn", response.content.toJSON().expires_in);
                //this.accessTokenBody = response.content.toJSON();
                console.log(response.content.toJSON());
            }, function (e) {
                console.log("Error occurred: " + e);
            });

        });

    }

}
