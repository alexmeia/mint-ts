import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import * as utils from "utils/utils";

import { HomeViewModel } from "./home-view-model";
import { KeycloakUtils } from "../utils/keycloak-utils";

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

    let authority = "http://keycloak-dev.phoops.it:9876/auth/realms/mint/protocol/openid-connect/auth";
    let oidcParams = {
        client_id: "nativescript-sample-client",
        redirect_uri: "it.phoops.mint://test",
        response_type: "code",
        scope: "openid profile all_claims",
        state: "56026239d44b4e678a4b56408da657e9", // TODO: retrieve from request object
        nonce: "0e36d3cf3e954b798d7233766b257f73" // TODO: retrieve from request object
    };

    utils.openUrl(KeycloakUtils.buildOidcUrl(authority, oidcParams));

    // TODO: import OidcClient and OidcClient.createSigninRequest
    // then openUrl
}
