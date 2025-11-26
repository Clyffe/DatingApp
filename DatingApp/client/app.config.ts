import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {lastValueFrom} from 'rxjs'
import { provideRouter, withViewTransitions } from "@angular/router";
import { AppRoutingModule, routes } from "src/app/app-routing.module";
import { provideHttpClient } from "@angular/common/http";
import { InitService } from "src/app/_services/init-service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(),
        provideZoneChangeDetection(),
        provideAppInitializer(async () => {
            const initService = inject(InitService);
            try{
                return lastValueFrom(initService.init())
            } finally{
                const splash = document.getElementById('init-splash');
                if (splash){
                    splash.remove()
                }
            }
        })
    ]
};