import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      console.log("Guardian")

    var jwt = localStorage.getItem("JWT");

    console.log(jwt == null)

    if(jwt == null){
      this.router.navigateByUrl('/auth/login');
      return false
    }else{

    }
    

    return true

      
      
  }


}
