import { Observable } from "data/observable";
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

export class HomeViewModel extends Observable {

    keycloakUrl: string;
    private _appURL: string;

    constructor() {
        super();

        let authority = "http://keycloak-dev.phoops.it:9876/auth/realms/mint/protocol/openid-connect/auth";
        let oidcParams = {
            client_id: "nativescript-sample-client",
            redirect_uri: "mint://test",
            response_type: "id_token token",
            scope: "openid profile all_claims",
            state: "56026239d44b4e678a4b56408da657e9", // TODO:  retrieve from request object
            nonce: "0e36d3cf3e954b798d7233766b257f73" // TODO:  retrieve from request object
        };

        let oidcUrl = this.buildOidcUrl(authority, oidcParams);
        console.log(oidcUrl);
        
        this.keycloakUrl = oidcUrl;

        handleOpenURL((appURL: AppURL) => {
            this._appURL = appURL.toString();
        });

        console.log(this._appURL);
    }

    get appURL(): string {
        return this._appURL;
    }

    buildOidcUrl(authority: string, params: any): string {
        let oidcUrl = authority + "?";
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                oidcUrl += key + "=" + params[key] + "&";
            }
        }
        return encodeURI(oidcUrl.slice(0, -1));
    }
}
