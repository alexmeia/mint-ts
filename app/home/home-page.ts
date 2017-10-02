import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import * as utils from "utils/utils";

import { HomeViewModel } from "./home-view-model";
import { KeycloakUtils } from "../utils/keycloak-utils";
import * as OidcUtils from "../utils/oidc-utils";
import { Utils } from "../utils/utils";
import * as Constants from "../utils/constants";

import * as dialogs from "ui/dialogs";


let keycloakUtils: KeycloakUtils = new KeycloakUtils(); // Does is work?

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function openLoginPage() {
    OidcUtils.openLoginPage();
}

export function getAccessToken() {
    //let keycloakUtils: KeycloakUtils = new KeycloakUtils();
    OidcUtils.getAccesToken().then(response => {
        let accessToken: string;
        if (typeof response === "string") {
            accessToken = response;
            console.log("Access token as string: ", accessToken);
        } else {
            let responseObj = response.content.toJSON();
            accessToken = responseObj.access_token;
            if (accessToken) {
                console.log("Access token from response: ", accessToken);
                if (OidcUtils.saveAccessData(responseObj)) {
                    console.log("New access data saved in secure storage.")
                } else {
                    console.error("Error in saving new access data in secure storage.")
                }
            }
            else {
                OidcUtils.openLoginPage();
            }
        }
    }, function (e) {
        console.log(e);
        OidcUtils.openLoginPage();
    });
}

export function logout() {
    // OidcUtils.logout().then((response) => {
    //     if (response.statusCode < 400) {
    //         dialogs.alert({
    //             message: "Logout eseguito correttamente.",
    //             okButtonText: "OK"
    //         });
    //     }
    //     else {
    //         dialogs.alert("Response code: " + response.statusCode)
    //     }
    // }, function(e) {
    //     dialogs.alert("Sessione utente terminata.");
    // });
    OidcUtils.openLogoutPage();

}

export function clearSecureStorage() {
    OidcUtils.clearSecureStorage();
}
