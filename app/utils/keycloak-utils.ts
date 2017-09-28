import { SecureStorage } from "nativescript-secure-storage";

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
            }
            else {
                console.log("Saved ", key);
            }
        }

        return success;
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