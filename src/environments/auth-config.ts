// src/environments/auth-config.ts
import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '<YOUR_CLIENT_ID>', // Azure AD Client ID
    authority: 'https://login.microsoftonline.com/<YOUR_TENANT_ID>', // Tenant ID
    redirectUri: 'http://localhost:8100', // Redirect URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ['user.read'], // Add your required scopes
};
