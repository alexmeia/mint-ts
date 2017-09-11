import { Observable } from "data/observable";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
export class MyDrawerViewModel extends Observable {
    private _navigationItems: Array<any>;

    /* ***********************************************************
    * Use the MyDrawer view model constructor to initialize the properties data values.
    * The navigationItems property is initialized here and is data bound to <ListView> in the MyDrawer view file.
    * Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    *************************************************************/
    constructor(selectedPage: string) {
        super();

        this._navigationItems = [
            {
                title: "Home",
                name: "home",
                route: "home/home-page",
                icon: "\uf015",
                isSelected: selectedPage === "Home"
            },
            {
                title: "Login",
                name: "login",
                route: "login/login-page",
                icon: "\uf090",
                isSelected: selectedPage === "Login"
            },
            {
                title: "News",
                name: "browse",
                route: "browse/browse-page",
                icon: "\uf1ea",
                isSelected: selectedPage === "Browse"
            },
            {
                title: "Cerca",
                name: "search",
                route: "search/search-page",
                icon: "\uf002",
                isSelected: selectedPage === "Search"
            },
            {
                title: "Preferiti",
                name: "featured",
                route: "featured/featured-page",
                icon: "\uf005",
                isSelected: selectedPage === "Featured"
            },
            {
                title: "Impostazioni",
                name: "settings",
                route: "settings/settings-page",
                icon: "\uf013",
                isSelected: selectedPage === "Settings"
            }
        ];
    }

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }
}
