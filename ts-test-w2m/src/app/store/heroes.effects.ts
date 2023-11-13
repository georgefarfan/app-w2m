import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionStorageService } from '../core/session-storage.service';
import {
  addHeoreSuccess,
  addHeroe,
  heroesList,
  heroesListSuccess,
} from './heroes.actions';
import { map } from 'rxjs';
import { Heroe } from '../shared/interfaces/heroes';

@Injectable()
export class HeroesEffects {
  addHeroe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHeroe),
      map((params) => {
        const { firstName, lastName } = params.data;

        this.updateHeroesData({
          firstName,
          lastName,
        });

        return addHeoreSuccess({
          data: this.sessionStorageService.getHeroes(),
        });
      })
    )
  );

  loadPodCastList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroesList),
      map(() => {
        return heroesListSuccess({
          data: this.sessionStorageService.getHeroes(),
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionStorageService: SessionStorageService
  ) {}

  private updateHeroesData(params: Heroe) {
    let currentHeroesData = this.sessionStorageService.getHeroes();
    let newHeroe: Heroe = {
      firstName: params.firstName,
      lastName: params.lastName,
    };
    currentHeroesData?.heroes.push(newHeroe);
    this.sessionStorageService.setHeroes(currentHeroesData);
  }
}
