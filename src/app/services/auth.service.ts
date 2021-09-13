import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Msg } from '../models/msg';

import { tap } from 'rxjs/operators'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SharedService } from '../shared/shared.service';



@Injectable()
export class AuthService {

  AUTH_SERVER: string = 'https://cotufa-back.herokuapp.com';

  private jwt: string;
  constructor(private httpClient: HttpClient, private shared: SharedService) { }




  createUser(user: User): Observable<Msg>{
    return this.httpClient.post<Msg>( `${this.AUTH_SERVER}/user`, user )
      .pipe(tap((response: Msg) => {
          if(response){
            console.log(response.msg)
          }else{
            console.log(response)
          }
        }
      ))
  }

  generateToken(user: User): Observable<Jwt>{
    return this.httpClient.post<Jwt>( `${this.AUTH_SERVER}/token`, user )
      .pipe(tap(
        async (response: Jwt) => {
          if(response){
            if(response.jwt){
              this.shared.loadJWT(response.jwt)
              this.saveToken(response.jwt) 
            }

          }
        }
      ))
  }

  eliminarToken(): void{
    this.jwt = '';
    this.shared.loadJWT(null)
    localStorage.removeItem("JWT")
  }

  private saveToken(jwt: string): void{
    localStorage.setItem("JWT", jwt);
    this.jwt = jwt;
  }

  public getToken(): string{

    if(!this.jwt){
      this.jwt = localStorage.getItem("JWT");
    }
    return this.jwt;
  }
}
