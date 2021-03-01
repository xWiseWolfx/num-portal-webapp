import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FilterChipsComponent } from './filter-chips/filter-chips.component'
import { SearchComponent } from './search/search.component'
import { FilterTableComponent } from './filter-table/filter-table.component'
import { PipesModule } from '../pipes/pipes.module'
import { DefinitionListComponent } from './definition-list/definition-list.component'
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component'
import { TimeInputComponent } from './time-input/time-input.component'
import { EditorDetermineHitsComponent } from './editor-determine-hits/editor-determine-hits.component'

const SHARED_DECLARATIONS = [
  SearchComponent,
  FilterChipsComponent,
  ButtonComponent,
  FilterTableComponent,
  DefinitionListComponent,
  TimeInputComponent,
  DialogConfirmationComponent,
  EditorDetermineHitsComponent,
]

@NgModule({
  declarations: SHARED_DECLARATIONS,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
  ],
  exports: SHARED_DECLARATIONS,
})
export class SharedComponentsModule {}