import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SelfService } from 'src/app/services/self/self.service';
import { ClientResponse } from '../../models/response/clientResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user/user';

@Injectable({
    providedIn: 'root'
})
export class SelfGuard implements CanActivate {
    constructor(private selfService: SelfService, private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            // If we already have the user
            if (this.selfService.user$.value) {
                return resolve(true);
            }

            // Update the user from server
            this.selfService.getSelf()
                .then((user: User) => {
                    resolve(true);
                })
                .catch((res: ClientResponse) => {
                    this.authService.logout();
                    resolve(false);
                })
        })
    }
}
