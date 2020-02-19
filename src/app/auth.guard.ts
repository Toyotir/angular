import { Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private adminS: AdminService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    // const url: string = state.url;
    const url = next['url'];
    if (this.adminS.isLog){
      return true;
    } else if(!this.adminS.isAdmin){
      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['/login'], {
            queryParams: {
              url
            }
          }
        )
      );
    }
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            url
          }
        }
      )
    );
    return false;
    // return this.checkLogin(url);

    // if (this.adminS.isLog) {
    //   this.router.navigate(['/soc'])
    //   return true;
    // }
    // else
    //   return false;
  }
  // checkLogin(url: string): boolean {
  //   if (this.adminS.isLog) { return true; }

  //   // Store the attempted URL for redirecting
  //   this.adminS.redirectUrl = url;

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}

@Injectable({
  providedIn: 'root'
})
export class Adminguard implements CanActivate {
  constructor(private adminS: AdminService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const url = next['url'];
    if (!this.adminS.isAdmin){
      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['/invalid'], {
            queryParams: {
              url
            }
          }
        )
      );
      return false;
    } else {
      return true;
    }
  }
}
