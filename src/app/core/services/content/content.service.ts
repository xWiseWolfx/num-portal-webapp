/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ISofaScoreAverage } from 'src/app/shared/models/charts/sofa-score-average.interface'
import { ISofaScoreDistribution } from 'src/app/shared/models/charts/sofa-score-distribution.interface'
import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'
import { IDashboardMetrics } from 'src/app/shared/models/content/dashboard-metrics.interface'
import { IDashboardProject } from 'src/app/shared/models/content/dashboard-project.interface'
import { INavigationLink } from 'src/app/shared/models/content/navigation-link.interface'

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private baseUrl: string

  private navigationLinks: INavigationLink[] = []
  private navigationLinksSubject$ = new BehaviorSubject(this.navigationLinks)
  public navigationLinksObservable$ = this.navigationLinksSubject$.asObservable()

  private cards: IDashboardCard[] = []
  private cardsSubject$ = new BehaviorSubject(this.cards)
  public cardsObservable$ = this.cardsSubject$.asObservable()

  private metrics: IDashboardMetrics = undefined
  private metricsSubject$ = new BehaviorSubject(this.metrics)
  public metricsObservable$ = this.metricsSubject$.asObservable()

  private projects: IDashboardProject[] = undefined
  private projectsSubject$ = new BehaviorSubject(this.projects)
  public projectsObservable$ = this.projectsSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/content`
  }

  getNavigationLinks(): Observable<INavigationLink[]> {
    return this.httpClient.get<INavigationLink[]>(`${this.baseUrl}/navigation`).pipe(
      tap((links) => {
        this.navigationLinks = links
        this.navigationLinksSubject$.next(links)
      }),
      catchError(this.handleError)
    )
  }

  updateNavigationLinks(navigationLinks: INavigationLink[]): Observable<INavigationLink[]> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<INavigationLink[]>(`${this.baseUrl}/navigation`, navigationLinks, httpOptions)
      .pipe(
        tap((links) => {
          this.navigationLinks = navigationLinks
          this.navigationLinksSubject$.next(navigationLinks)
        }),
        catchError(this.handleError)
      )
  }

  getCards(): Observable<IDashboardCard[]> {
    return this.httpClient.get<IDashboardCard[]>(`${this.baseUrl}/cards`).pipe(
      tap((cards) => {
        this.cards = cards
        this.cardsSubject$.next(cards)
      }),
      catchError(this.handleError)
    )
  }

  updateCards(dashboardCards: IDashboardCard[]): Observable<IDashboardCard[]> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<IDashboardCard[]>(`${this.baseUrl}/cards`, dashboardCards, httpOptions)
      .pipe(
        tap((cards) => {
          this.cards = cards
          this.cardsSubject$.next(cards)
        }),
        catchError(this.handleError)
      )
  }

  getMetrics(): Observable<IDashboardMetrics> {
    return this.httpClient.get<IDashboardMetrics>(`${this.baseUrl}/metrics`).pipe(
      tap((metrics) => {
        this.metrics = metrics
        this.metricsSubject$.next(metrics)
      }),
      catchError(this.handleError)
    )
  }

  getLatestProjects(): Observable<IDashboardProject[]> {
    return this.httpClient.get<IDashboardProject[]>(`${this.baseUrl}/latest-projects`).pipe(
      tap((projects) => {
        this.projects = projects
        this.projectsSubject$.next(projects)
      }),
      catchError(this.handleError)
    )
  }

  getClinics(): Observable<string[]> {
    // return this.httpClient
    //   .get<string[]>(`${this.baseUrl}/graph/clinic`)
    //   .pipe(catchError(this.handleError))
    const mockData = [
      'Klinik1',
      'Klinik2',
      'Klinik3',
      'Klinik4',
      'Klinik5',
      'Klinik6',
      'Klinik7',
      'Klinik8',
      'Klinik9',
      'Klinik10',
      'Klinik11',
      'Klinik12',
      'Klinik13',
      'Klinik14',
      'Klinik15',
      'Klinik16',
      'Klinik17',
      'Klinik18',
      'Klinik19',
      'Klinik20',
      'Klinik21',
      'Klinik22',
      'Klinik23',
      'Klinik24',
      'Klinik25',
      'Klinik26',
      'Klinik27',
      'Klinik28',
      'Klinik29',
      'Klinik30',
      'Klinik31',
      'Klinik32',
      'Klinik33',
      'Klinik34',
    ]
    return of(mockData)
  }
  getSofaScoreDistribution(clinic: string): Observable<ISofaScoreDistribution> {
    // return this.httpClient
    //   .get<ISofaScoreDistribution>(`${this.baseUrl}/graph/clinic/${clinic}/sofaDistribution`)
    //   .pipe(catchError(this.handleError))
    const mockData = { '0-4': 3, '5-9': 1, '10-14': 6, '15-19': 2, '20-24': 2 }
    return of(mockData)
  }
  getSofaScoreAverage(): Observable<ISofaScoreAverage> {
    // return this.httpClient
    //   .get<any>(`${this.baseUrl}/graph/clinic/sofaAverage`)
    //   .pipe(catchError(this.handleError))
    const mockData = {
      Klinik1: 10,
      Klinik2: 11,
      Klinik3: 12,
      Klinik4: 1,
      Klinik5: 6,
      Klinik6: 12,
      Klinik7: 23,
      Klinik8: 12,
      Klinik9: 12,
      Klinik10: 12,
      Klinik11: 12,
      Klinik12: 12,
      Klinik13: 12,
      Klinik14: 12,
      Klinik15: 12,
      Klinik16: 12,
      Klinik17: 12,
      Klinik18: 12,
      Klinik19: 12,
      Klinik20: 12,
      Klinik21: 12,
      Klinik22: 12,
      Klinik23: 12,
      Klinik24: 12,
      Klinik25: 12,
      Klinik26: 12,
      Klinik27: 12,
      Klinik28: 12,
      Klinik29: 12,
      Klinik30: 12,
      Klinik31: 12,
      Klinik32: 12,
      Klinik33: 12,
      Klinik34: 12,
    }
    return of(mockData)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
