import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, // Spread existing appConfig providers if defined
    provideRouter(routes)   // Add routing support
  ]
}).catch((err) => console.error(err));
