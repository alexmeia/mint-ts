import { Observable } from "data/observable";
import { handleOpenURL, AppURL } from "nativescript-urlhandler";
import * as Constants from "../utils/constants";
import * as http  from "http";
import { Utils } from "../utils/utils";



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

            // Build queryString to request access token

            let params: any = {
                grant_type: "authorization_code",
                client_id: Constants.KEYCLOAK_CLIENT_ID,
                client_secret: Constants.KEYCLOAK_CLIENT_SECRET,
                code: code,
                redirect_uri: Constants.KEYCLOAK_REDIRECT_URL
            }

            let data: string = Utils.buildQueryString(params);

            this.set("authCode", code);
        
            // Exchange the Authorization Code for an Access Token
            let options = { 
                method: "POST",
                url: Constants.KEYCLOAK_ACCESS_URL,
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
