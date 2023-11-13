import { createAction, props } from '@ngrx/store';
import { HeroesData } from './heroes.model';
import { Heroe } from '../shared/interfaces/heroes';

export const init = createAction('[Heroes] -  INIT', props<{ data: any }>());
export const heroesList = createAction('[Heroes] -  LOAD LIST');
export const heroesListSuccess = createAction(
  '[Heroes] -  LOAD LIST SUCCESS',
  props<{ data: HeroesData }>()
);
export const addHeroe = createAction(
  '[Heroes] -  ADD HEROE',
  props<{ data: Heroe }>()
);

export const addHeroeSuccess = createAction(
  '[Heroe] -  ADD HEROE SUCCESS',
  props<{ data: HeroesData }>()
);

export const removeHeroe = createAction(
  '[Heroes] -  REMOVE HEROE',
  props<{
    data: Heroe;
  }>()
);

export const removeHeroeSuccess = createAction(
  '[Heroe] -  REMOVE HEROE SUCCESS',
  props<{ data: HeroesData }>()
);

export const findHeroe = createAction(
  '[Heroe] -  FIND HEROE',
  props<{
    data: {
      id: string;
    };
  }>()
);

export const findHeroeSuccess = createAction(
  '[Heroe] -  FIND HEROE SUCCESS',
  props<{ data: HeroesData }>()
);
