import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroNewComponent } from './components/hero-new/heroes-new.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  },
  {
    path: 'new',
    component: HeroNewComponent,
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
