import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import * as utils from "utils/utils";

import { HomeViewModel } from "./home-view-model";
import { KeycloakUtils } from "../utils/keycloak-utils";
import { Utils } from "../utils/utils";
import * as Constants from "../utils/constants";

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

    let authority = Constants.KEYCLOAK_AUTH_URL;

    let state = Utils.guid();
    let nonce = Utils.guid();

    // TODO: store state and nonce

    let oidcParams = {
        client_id: Constants.KEYCLOAK_CLIENT_ID,
        redirect_uri: Constants.KEYCLOAK_REDIRECT_URL,
        response_type: "code",
        scope: "openid profile all_claims",
        state: state,
        nonce: nonce
    };

    //utils.openUrl(KeycloakUtils.buildOidcUrl(authority, oidcParams));
    utils.openUrl(authority + "?" + Utils.buildQueryString(oidcParams))

    // TODO: import OidcClient and OidcClient.createSigninRequest
    // then openUrl
}
