import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class HeroesModule {}
