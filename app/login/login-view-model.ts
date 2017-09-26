import { Observable } from "data/observable";
import { KeycloakUtils } from "../utils/keycloak-utils";

export class LoginViewModel extends Observable {

    url: string;

    constructor() {
        super();

        let authority = "http://keycloak-dev.phoops.it:9876/auth/realms/mint/protocol/openid-connect/auth";

        let oidcParams = {
            client_id: "nativescript-sample-client",
            redirect_uri: "http://localhost:8080/static/callback",
            response_type: "code",
            scope: "openid profile all_claims",
            state: "56026239d44b4e678a4b56408da657e9", // TODO:  retrieve from request object
            nonce: "0e36d3cf3e954b798d7233766b257f73"
        };

        let oidcUrl = KeycloakUtils.buildOidcUrl(authority, oidcParams);
        console.log(oidcUrl);
        
        this.url = oidcUrl;
    }

}
