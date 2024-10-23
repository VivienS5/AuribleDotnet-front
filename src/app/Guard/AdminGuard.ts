import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,Router , CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthService } from "../service/AuthService";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate
{
  constructor(private authService: AuthService,private msalService: MsalService,private router: Router) { }
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | boolean {
      return this.authService.login().pipe(
        map((isAdmin: boolean) => {
          console.log(isAdmin);
          if(isAdmin) {
            return true;
          }
          this.router.navigate(['']);
          return false;
        }),
        catchError((error) => {
          console.error(error);
          this.router.navigate(['/login']);
          return of(false);  // retourne false en cas d'erreur
        })
      )
  }

}
