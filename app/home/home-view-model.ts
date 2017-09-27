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
            this.callbackUrl = appURL.toString();
            this.set("testUrl", appURL.toString());
            console.log("App URL: " + this.callbackUrl);

            // Read Authorization code parameter from callback url
            let authorizationCode = this.callbackUrl.substr(this.callbackUrl.indexOf("code=") + 5, this.callbackUrl.length);
            console.log(authorizationCode);

            let data: string = "grant_type=authorization_code&client_id=nativescript-sample-client&client_secret=1ca49903-3d90-4d3c-912e-910cbb61cf77&code=" 
                                    + authorizationCode + "&redirect_uri=it.phoops.mint://test" 
        
            // Exchange the Authorization Code for an Access Token
            let options = { 
                method: "POST",
                url: 'http://localhost:9876/auth/realms/mint/protocol/openid-connect/token',
                headers: { "content-type": "application/x-www-form-urlencoded" },
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
