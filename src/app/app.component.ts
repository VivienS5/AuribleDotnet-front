import { Component, Inject, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { loginRequest } from '../environments/auth-config';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './service/AuthService';
import { RedirectRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService,private authService: AuthService) {}

  ngOnInit() {
    this.checkAccount();
    this.msalService.handleRedirectObservable().subscribe(() => {
      console.log("Redirected");
      this.authService.login();
    })
  }

  checkAccount() {
    const account = this.msalService.instance.getActiveAccount();
    if (!account) {
      this.msalService.instance.loginRedirect(loginRequest);
    }
  }

  login() {
    this.msalService.instance.loginPopup(loginRequest).then((response) => {
      this.msalService.instance.setActiveAccount(response.account);
    });
  }

  logout() {
    this.msalService.instance.logout();
  }
}
