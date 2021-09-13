import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentJWT = new BehaviorSubject<string>(null)

  constructor() {
    if(localStorage.getItem("JWT")){
      this.currentJWT.next(localStorage.getItem("JWT"))
    }
   }

  public loadJWT(jwt: string){
    this.currentJWT.next(jwt)
  }

  public getJWT(): Observable<string>{
    return this.currentJWT.asObservable();
  }

}
