
export class KeycloakUtils {

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