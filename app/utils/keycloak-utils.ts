import { SecureStorage } from "nativescript-secure-storage";
import * as utils from "utils/utils";
import { Utils } from "../utils/utils";
import * as Constants from "../utils/constants";
import * as jwtDecode from "jwt-decode";
import * as http  from "http";

export class KeycloakUtils {
    secureStorage: SecureStorage;

    constructor() {
        this.secureStorage = new SecureStorage();
    }

    public saveAccessData(accessData: any): boolean {
        let success: boolean = true;

        for (let key in accessData) {
            let stored = this.secureStorage.setSync({
                key: key,
                value: accessData[key] + ""
            });
            if (!stored) {
                success = false;
            } else {
                console.log("Saved ", key);
            }
        }
        return success;
    }

    public  getAccesToken(): string {

        let accessToken: string = this.secureStorage.getSync({key: "access_token"});

        if (accessToken === null) {
            // new login is needed
            return accessToken;
        }        
        else if (this.isTokenNotExpired(accessToken)) {
            return accessToken;
        }
        else {
            let refreshToken: string = this.secureStorage.getSync({key: "refresh_token"});
            if (this.isTokenNotExpired(refreshToken)) {
                // get new access token and return it
                let responseObj = this.getUpdatedAccesData(refreshToken);
                if (responseObj) {
                   let saved = this.saveAccessData(responseObj);
                   if (saved) {
                       return responseObj.access_token;
                       // or: get access_token from storage
                   }
                   else {
                       console.error("Error in saving data.")
                       return null; // how to manage this? return null if access data are not stored?
                   }
                }
                else {
                    console.error("Error: empty response.");
                    return null;
                }
            }
            else {
                return null;
            }
        }
    }

    public  getUpdatedAccesData(refreshToken: string): any {

        let params: any = {
            grant_type: "refresh_token",
            client_id: Constants.KEYCLOAK_CLIENT_ID,
            client_secret: Constants.KEYCLOAK_CLIENT_SECRET,
            refresh_token: refreshToken
        }

        let data: string = Utils.buildQueryString(params);
    
        // Exchange the Authorization Code for an Access Token
        let options = {
            method: "POST",
            url: Constants.KEYCLOAK_ACCESS_URL,
            headers: { "content-type": "application/x-www-form-urlencoded" }, // Keycloak needs this content type
            content: data
        };
      
        http.request(options).then((response) => {
            //this.set("tokenType", response.content.toJSON().token_type);
            //this.set("expiresIn", response.content.toJSON().expires_in);
            //this.accessTokenBody = response.content.toJSON();
            return response.content.toJSON(); 
            //console.log(responseObj.token_type);           

        }, function (e) {
            console.log("Error occurred: " + e);
            return null;
        });
    }


        // 1. get access token in local storage and read expiration date (jwt-decode lib needed)
        // 2.1 if expiration date < now, return the accesss token
        // 2.2 else, get the refresh token from secure storage and read expiration date
        // 3.1 if refresh token expiration date < now, get access token with refresh token, saveAccessData and return access token
        // 3.2 else return null or open login page (what is better? may be return null)



    public isTokenNotExpired(token: string) : boolean {
        let decoded: any = jwtDecode(token);
        let tokenExpirationTime = decoded.exp * 1000;
        // 5 seconds of delay
        return tokenExpirationTime - Date.now() > 5000;
    }

    public openLoginPage(): void {
        let authority = Constants.KEYCLOAK_AUTH_URL;
        let state = Utils.guid();
        let nonce = Utils.guid();
        // Is necessary to store state and nonce values?

        let oidcParams = {
            client_id: Constants.KEYCLOAK_CLIENT_ID,
            redirect_uri: Constants.KEYCLOAK_REDIRECT_URL,
            response_type: "code",
            scope: "openid profile all_claims",
            state: state,
            nonce: nonce
        };
        utils.openUrl(authority + "?" + Utils.buildQueryString(oidcParams));
    }

    // Build the complete url to open keycloak login page
    public static buildOidcUrl(authority: string, params: any): string {
        let oidcUrl = authority + "?";
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                oidcUrl += key + "=" + params[key] + "&";
            }
        }
        return encodeURI(oidcUrl.slice(0, -1));
    }
}
