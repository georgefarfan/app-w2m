import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionStorageService } from '../core/session-storage.service';
import {
  addHeroeSuccess,
  addHeroe,
  heroesList,
  heroesListSuccess,
  removeHeroe,
  removeHeroeSuccess,
} from './heroes.actions';
import { map } from 'rxjs';
import { Heroe } from '../shared/interfaces/heroes';

enum HeroeActions {
  NEW,
  EDIT,
  REMOVE,
}

@Injectable()
export class HeroesEffects {
  addHeroe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHeroe),
      map((params) => {
        const { firstName, lastName } = params.data;

        this.updateHeroesData(
          {
            firstName,
            lastName,
          },
          HeroeActions.NEW
        );

        return addHeroeSuccess({
          data: this.sessionStorageService.getHeroes(),
        });
      })
    )
  );

  removeHeroe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeHeroe),
      map((params) => {
        const { id, firstName, lastName } = params.data;

        this.updateHeroesData(
          {
            id,
            firstName,
            lastName,
          },
          HeroeActions.REMOVE
        );

        return removeHeroeSuccess({
          data: this.sessionStorageService.getHeroes(),
        });
      })
    )
  );

  loadHeroeList$ = createEffect(() =>
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

  private updateHeroesData(params: Heroe, action: HeroeActions) {
    let currentHeroesData = this.sessionStorageService.getHeroes();

    switch (action) {
      case HeroeActions.NEW:
        let newHeroe: Heroe = {
          id: `${currentHeroesData.heroes.length + 1}`,
          firstName: params.firstName,
          lastName: params.lastName,
        };

        currentHeroesData?.heroes.push(newHeroe);
        break;
      case HeroeActions.EDIT:
        break;
      case HeroeActions.REMOVE:
        currentHeroesData = {
          ...currentHeroesData,
          heroes: currentHeroesData.heroes.filter(
            (heroe) => heroe.id && heroe.id !== params.id
          ),
        };
        break;

      default:
        break;
    }

    this.sessionStorageService.setHeroes(currentHeroesData);
  }
}
