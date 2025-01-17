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

import { NgModule } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatChipsModule } from '@angular/material/chips'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTreeModule } from '@angular/material/tree'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatMenuModule } from '@angular/material/menu'
import { MatRadioModule } from '@angular/material/radio'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { DragDropModule } from '@angular/cdk/drag-drop'

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatChipsModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatTreeModule,
  MatProgressBarModule,
  MatMenuModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  DragDropModule,
]

@NgModule({
  declarations: [],
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
  providers: [MatDatepickerModule],
})
export class MaterialModule {}
