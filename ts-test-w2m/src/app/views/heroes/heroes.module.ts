import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroesNewComponent } from './components/heroes-new/heroes-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeroesListComponent,
    HeroesDetailComponent,
    HeroesNewComponent,
  ],
  imports: [
    SharedModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class HeroesModule {}
