import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';
import { HeroesNewComponent } from './components/heroes-new/heroes-new.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  },
  {
    path: 'new',
    component: HeroesNewComponent,
  },
  {
    path: 'detail/:id',
    component: HeroesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
