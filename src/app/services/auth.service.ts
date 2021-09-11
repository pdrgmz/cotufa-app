import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Msg } from '../models/msg';

import { catchError, tap } from 'rxjs/operators'

import { Observable , BehaviorSubject, of } from 'rxjs';

@Injectable()
export class AuthService {

  AUTH_SERVER: string = 'https://admiosflix-back.herokuapp.com';

  authSubject = new BehaviorSubject(false);
  private jwt: string;

  constructor(private httpClient: HttpClient) { }

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
        (response: Jwt) => {
          if(response){
            this.saveToken(response.jwt)            
          }
        }
      ))
      //),catchError(this.handleError<Jwt>('generateToken')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      var errorMsg = error.error.msg; 

      console.log(errorMsg);

      return of(result as T);
    };
  }

  eliminarToken(): void{
    this.jwt = '';
    localStorage.removeItem("JWT")
  }

  private saveToken(jwt: string): void{
    localStorage.setItem("JWT", jwt);
    this.jwt = jwt;
  }

  private getToken(): string{

    if(!this.jwt){
      this.jwt = localStorage.getItem("JWT");
    }
    return this.jwt;
  }
}
