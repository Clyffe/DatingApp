import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {lastValueFrom} from 'rxjs'
import { provideRouter, withViewTransitions } from "@angular/router";
import { AppRoutingModule, routes } from "src/app/app-routing.module";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { InitService } from "src/app/_services/init-service";
import { jwtInterceptor } from 'src/core/interceptor/jwt-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(withInterceptors([jwtInterceptor])),
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