import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ArchetypePipe } from './archetype.pipe'
import { GroupIndexPipe } from './group-index.pipe'
import { NestedAccessPipe } from './nested-access.pipe'
import { IsSelectedPipe } from './is-selected.pipe'
import { ItemVisibilityPipe } from './item-visibility.pipe'
import { LocalizedDatePipe } from './localized-date.pipe'
import { AqlItemVisibilityPipe } from './aql-item-visibility.pipe'
import { AvailableRolesPipe } from './available-roles.pipe'

const SHARED_DECLARATIONS = [
  GroupIndexPipe,
  ArchetypePipe,
  NestedAccessPipe,
  IsSelectedPipe,
  ItemVisibilityPipe,
  LocalizedDatePipe,
  AqlItemVisibilityPipe,
  AvailableRolesPipe,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [CommonModule],
  exports: [...SHARED_DECLARATIONS],
})
export class PipesModule {}