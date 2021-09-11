import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    
    const token: string = localStorage.getItem('JWT');

    let request = req;    

    if (token) {
      request = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${ token }`
        }
      });
    }else{      
      this.router.navigateByUrl('/auth/login');
    }

    return next.handle(request);
}
}
