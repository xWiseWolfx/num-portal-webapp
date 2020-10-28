import { Injectable } from '@angular/core'
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { KeycloakService } from 'keycloak-angular'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {
  constructor(private keycloak: KeycloakService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const redirectUri = window.location.origin + state.url
    return this.isAllowed(route, redirectUri)
  }

  canLoad(route: Route): Promise<boolean> {
    const redirectUri = window.location.origin + '/' + route.path
    return this.isAllowed(route, redirectUri)
  }

  async isAllowed(route: ActivatedRouteSnapshot | Route, redirectUri: string): Promise<boolean> {
    const allowedRoles = route.data?.roles

    if (!(allowedRoles instanceof Array) || allowedRoles.length === 0) {
      return Promise.resolve(true)
    }

    const userRoles = this.keycloak.getUserRoles(true)
    const isLoggedIn = await this.keycloak.isLoggedIn()

    if (!isLoggedIn) {
      await this.keycloak.login({
        redirectUri,
      })
    }

    return Promise.resolve(allowedRoles.some((role) => userRoles.indexOf(role) >= 0))
  }
}
