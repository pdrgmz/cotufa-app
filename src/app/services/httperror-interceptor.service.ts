import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor { 

  constructor(public toasterService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        
        catchError((error: HttpErrorResponse) => {
          
          let errorMsg =''

          if(error.error.msg){
            console.log("Error " + error.error.msg)
            errorMsg = error.error.msg;
            this.toasterService.error(null, error.error.msg, { positionClass: 'toast-bottom-center' });

          }

          return throwError(errorMsg);
        })
      )

  }
}