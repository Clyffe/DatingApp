import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../types/user';

// Handles the HTTP Requests from Client to Server

//Angular services are initialized when the app is, and aren't destroyed until the app is

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUser.set(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user =>{
        if (user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null);
    this.currentUser.set(null);

  }
}
