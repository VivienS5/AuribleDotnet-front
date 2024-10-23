import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { loginRequest } from '../environments/auth-config';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService) {}

  ngOnInit() {
    this.checkAccount();
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
