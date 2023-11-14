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
  findHeroe,
  findHeroeSuccess,
  updateHeroe,
  updateHeroeSuccess,
} from './heroes.actions';
import { map, mergeMap, switchMap, timer } from 'rxjs';
import { Heroe } from '../shared/models/heroes';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';
import { HeroesData } from './heroes.model';

enum HeroeActions {
  NEW,
  EDIT,
  REMOVE,
}

@Injectable()
export class HeroesEffects {
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHeroe),
      mergeMap((params) => {
        // Put timer for simulate the call http request
        return timer(1000).pipe(
          switchMap(() =>
            this.sessionStorageService.getHeroes().pipe(
              map((data) => {
                const { firstName, lastName, description } = params.data;

                const heroes = this.updateHeroesData(
                  data,
                  {
                    firstName,
                    lastName,
                    description,
                  },
                  HeroeActions.NEW
                );

                return addHeroeSuccess({
                  data: {
                    heroes,
                    message: this.translateService.instant(
                      'HEROES.ADD.MESSAGE.SUCCESS',
                      {
                        x: firstName,
                      }
                    ),
                  },
                });
              })
            )
          )
        );
      })
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHeroe),
      mergeMap((params) => {
        // Put timer for simulate the call http request
        return timer(1000).pipe(
          switchMap(() =>
            this.sessionStorageService.getHeroes().pipe(
              map((data) => {
                const { id, firstName, lastName, description } = params.data;

                const heroes = this.updateHeroesData(
                  data,
                  {
                    id,
                    firstName,
                    lastName,
                    description,
                  },
                  HeroeActions.EDIT
                );

                return updateHeroeSuccess({
                  data: {
                    heroes,
                    message: this.translateService.instant(
                      'HEROES.EDIT.MESSAGE.SUCCESS',
                      {
                        x: firstName,
                      }
                    ),
                  },
                });
              })
            )
          )
        );
      })
    )
  );

  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findHeroe),
      mergeMap((params) => {
        // Put timer for simulate the call http request

        return timer(1000).pipe(
          switchMap(() =>
            this.sessionStorageService.getHeroes().pipe(
              map((data) => {
                const { id } = params.data;
                return findHeroeSuccess({
                  data: this.findHeroe(data, id),
                });
              })
            )
          )
        );
      })
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeHeroe),
      mergeMap((params) => {
        return timer(1000).pipe(
          switchMap(() =>
            this.sessionStorageService.getHeroes().pipe(
              map((data) => {
                const { id, firstName, lastName, description } = params.data;

                const heroes = this.updateHeroesData(
                  data,
                  {
                    id,
                    firstName,
                    lastName,
                    description,
                  },
                  HeroeActions.REMOVE
                );

                return removeHeroeSuccess({
                  data: {
                    heroes,
                    message: this.translateService.instant(
                      'HEROES.REMOVE.MESSAGE.SUCCESS',
                      {
                        x: firstName,
                      }
                    ),
                  },
                });
              })
            )
          )
        );
      })
    )
  );

  list$ = createEffect(() =>
    this.actions$.pipe(
      ofType(heroesList),
      mergeMap(() => {
        // Put timer for simulate the call http request
        return timer(1000).pipe(
          switchMap(() =>
            this.sessionStorageService.getHeroes().pipe(
              map((data) => {
                return heroesListSuccess({
                  data,
                });
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService
  ) {}

  private findHeroe(data: HeroesData, id: string): Heroe {
    return data.heroes.find((h) => h.id === id) as Heroe;
  }

  private updateHeroesData(
    data: HeroesData,
    params: Heroe,
    action: HeroeActions
  ): HeroesData {
    switch (action) {
      case HeroeActions.NEW:
        let newHeroe: Heroe = {
          id: uuidv4(),
          firstName: params.firstName,
          lastName: params.lastName,
          description: params.description,
        };

        data?.heroes.push(newHeroe);
        break;
      case HeroeActions.EDIT:
        let updateHeroe: Heroe = {
          id: params.id,
          firstName: params.firstName,
          lastName: params.lastName,
          description: params.description,
        };
        data = {
          ...data,
          heroes: data.heroes.reduce((accu: Heroe[], curr: Heroe) => {
            let heroe = curr;
            if (curr.id === updateHeroe.id) {
              heroe = {
                ...heroe,
                firstName: updateHeroe.firstName,
                lastName: updateHeroe.lastName,
                description: updateHeroe.description,
              };
            }
            accu.push(heroe);
            return accu;
          }, []),
        };
        break;
      case HeroeActions.REMOVE:
        data = {
          ...data,
          heroes: data.heroes.filter(
            (heroe) => heroe.id && heroe.id !== params.id
          ),
        };
        break;

      default:
        break;
    }

    this.sessionStorageService.setHeroes(data);
    return data;
  }
}
