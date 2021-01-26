import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { ProfileService } from '../services/profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo: IAuthUserInfo = { sub: undefined }
  private userInfoSubject$ = new BehaviorSubject(this.userInfo)
  public userInfoObservable$ = this.userInfoSubject$.asObservable()

  constructor(
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.initTokenHandling()
  }

  private initTokenHandling(): void {
    this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        this.fetchUserInfo()
      }
    })
  }

  public get isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()
  }

  public login(): void {
    this.oauthService.initCodeFlow()
  }

  public logout(): void {
    this.clearUserInfo()
    this.oauthService.logOut()
  }

  private createUser(userId: string): Observable<any> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<any>(
        `${this.appConfig.config.api.baseUrl}/admin/user/${userId}`,
        undefined,
        httpOptions
      )
      .pipe(catchError(this.handleError))
  }

  async fetchUserInfo(): Promise<void> {
    if (!this.isLoggedIn) {
      return Promise.resolve()
    }

    try {
      this.profileService.get().subscribe()
      const userInfo = await this.oauthService.loadUserProfile()
      if (this.userInfo.sub !== userInfo.sub) {
        this.createUser(userInfo.sub).subscribe()
      }
      this.userInfo = userInfo
      this.userInfoSubject$.next(this.userInfo)
    } catch (error) {
      this.clearUserInfo()
      Promise.reject('Failed to fetch userInfo')
    }
  }

  private clearUserInfo(): void {
    this.userInfo = { sub: undefined }
    this.userInfoSubject$.next(this.userInfo)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
