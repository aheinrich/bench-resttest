import { enableProdMode } from "@angular/core";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { HTTP_PROVIDERS } from "@angular/http";
import { AppComponent, AppSettings, ISettings } from "./index";


const runBoostrap = (settings:ISettings) => {
    bootstrap(AppComponent, [
        HTTP_PROVIDERS,
    ]).then(
        success => {
            if (settings.environment === 'development') console.log(`Bootstrap success`)
        })
        .catch(
        error => {
            console.log(error)
        });
}

try {
    // Use Fetch Api to pull down server-provided settings
    fetch('/settings', { method: 'get' })
        .then((response) => {
            return response.json()
        })
        .then((settings: ISettings) => {

            // Apply the settings to the Application
            AppSettings.settings = settings;

            // If platform is set to 'Production' mode
            if (AppSettings.settings.environment == 'production') {
                enableProdMode();
            };

            // Startup the application
            runBoostrap(settings)

        });

} catch (err) {
    console.log("Unable to fetch settings from platform")
    throw err;
}


