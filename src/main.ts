import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  MsalService,
  MSAL_INSTANCE,
  MsalGuard,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { routes } from './app/app.routes';

// MSAL configuration
export function MSALInstanceFactory() {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: 'b9385f89-d371-4a84-8126-4ae9fb977898', // Replace with your Client ID
      authority: 'https://login.microsoftonline.com/common', // Replace with tenant-specific authority if needed
      redirectUri: 'http://localhost:4200', // Replace with your redirect URI
    },
    cache: {
      cacheLocation: 'localStorage', // Cache tokens in localStorage
      storeAuthStateInCookie: true, // For compatibility across browsers
    },
  });

  // Await the MSAL instance initialization before making any API calls
  return msalInstance;
}

// MSAL Guard Configuration
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect, // Use redirect for authentication
    authRequest: {
      scopes: ['user.read'], // Define the required scopes
    },
  };
}

// Bootstrap the application with MSAL and other providers
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory }, // Provide the MSAL instance
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory }, // Provide the MSAL Guard configuration
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient with interceptors
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
