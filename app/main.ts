import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {AppModule} from './app.module'
import {enableProdMode} from '@angular/core'

//don't run this line of code while in development
//enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)