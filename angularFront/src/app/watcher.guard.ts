import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatcherGuard implements CanActivate {

  constructor(
    private cookieService:CookieService, private router:Router,
 
    ) {}

  redirect(flag:boolean):any{
    if(!flag){
      this.router.navigateByUrl('/login');
    }

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const cookie=this.cookieService.check('token');
    this.redirect(cookie);
    return cookie;
  }
  
}
