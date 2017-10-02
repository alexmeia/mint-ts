
const KEYCLOAK_MINT_REALM_URL = "http://keycloak-dev.phoops.it:9876/auth/realms/mint/protocol/openid-connect/";
const KEYCLOACK_AUTH_PATH = "auth";
const KEYCLOACK_ACCESS_PATH = "token";
const KEYCLOACK_LOGOUT_PATH = "logout";

export const KEYCLOAK_AUTH_URL = KEYCLOAK_MINT_REALM_URL + KEYCLOACK_AUTH_PATH;
export const KEYCLOAK_ACCESS_URL = KEYCLOAK_MINT_REALM_URL + KEYCLOACK_ACCESS_PATH;
export const KEYCLOAK_LOGOUT_URL = KEYCLOAK_MINT_REALM_URL + KEYCLOACK_LOGOUT_PATH;
export const KEYCLOAK_CLIENT_SECRET = "22c52bfc-c933-4055-8b88-cd99c2064906";
export const KEYCLOAK_CLIENT_ID = "nativescript-sample-client";
export const KEYCLOAK_REDIRECT_URL = "it.phoops.mint://test";
export const KEYCLOAK_REDIRECT_URL_LOGOUT = "it.phoops.mint://test?logout=logout";