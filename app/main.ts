//this is what ultimately bootstraps our angular app via the index.html

//access angular's bootstrap function
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app.module'

//platformBrowserDynamic svc is what bootstraps the module in the main execution
platformBrowserDynamic().bootstrapModule(AppModule)
