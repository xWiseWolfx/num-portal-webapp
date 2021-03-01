import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { take } from 'rxjs/operators'
import { MatTableDataSource } from '@angular/material/table'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { Subscription } from 'rxjs'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { IItemVisibility } from '../../../../shared/models/item-visibility.interface'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface'
import { Router } from '@angular/router'
import { AqlMenuKeys, MENU_ITEM_CLONE, MENU_ITEM_DELETE, MENU_ITEM_EDIT } from './menu-item'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { DELETE_APPROVAL_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-aql-table',
  templateUrl: './aql-table.component.html',
  styleUrls: ['./aql-table.component.scss'],
})
export class AqlTableComponent implements AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  user: IUserProfile
  constructor(
    private aqlService: AqlService,
    private profileService: ProfileService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.aqlService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))

    this.subscriptions.add(
      this.aqlService.filteredAqlsObservable$.subscribe((aqls) => this.handleData(aqls))
    )
    this.subscriptions.add(
      this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
    )
  }

  displayedColumns: string[] = [
    'menu',
    'name',
    'author',
    'creationDate',
    'isPublic',
    'organisation',
  ]
  dataSource = new MatTableDataSource()
  menuItems: IItemVisibility[] = [MENU_ITEM_CLONE, MENU_ITEM_EDIT, MENU_ITEM_DELETE]
  filterConfig: IAqlFilter
  selectedItem = 'AQL.ALL_AQLS'

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleData(aqls: IAqlApi[]): void {
    this.dataSource.data = aqls
  }

  handleMenuClick(key: string, id: number): void {
    switch (key) {
      case AqlMenuKeys.Edit:
      case AqlMenuKeys.Clone:
        this.router.navigate(['aqls', id, 'editor'])
        break
      case AqlMenuKeys.Delete:
        this.handleWithDialog(DELETE_APPROVAL_DIALOG_CONFIG, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.delete(id).then(() => {
          this.aqlService.getAll().subscribe((aqls) => this.handleData(aqls))
        })
      }
    })
  }

  async delete(id): Promise<void> {
    try {
      await this.aqlService.delete(id).toPromise()
      // TODO: Display message to user
    } catch (error) {
      console.log(error)
      // TODO: Display message to user
    }
  }
}