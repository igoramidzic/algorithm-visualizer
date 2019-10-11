import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user/user';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getSelf(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/self`)
        .subscribe((res: ClientResponse) => {
          this.user$.next(res.result.user);
          resolve(res.result.user)
        },
          (err: ClientResponse) => reject(err))
    })
  }

  updateSelf(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiBase}/self`, user)
        .subscribe((res: ClientResponse) => {
          this.user$.next(res.result.user);
          resolve(res.result.user)
        }, (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  updatePassword(passwords: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiBase}/self/password`, passwords)
        .subscribe((res: ClientResponse) => {
          resolve(res.isSuccess)
        }, (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  deleteSelf(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiBase}/self`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.user)
        }, (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  removeUser(): void {
    this.user$.next(null);
  }

  fullName(): string {
    if (!this.user$.value)
      return "";
    return this.user$.value.firstName + " " + this.user$.value.lastName;
  }
}
