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

export const addHeoreSuccess = createAction(
  '[Heroe] -  FIND HEROE SUCCESS',
  props<{ data: HeroesData }>()
);

export const findHeore = createAction(
  '[Heroe] -  FIND HEROE',
  props<{ data: string }>()
);

export const findHeoreSuccess = createAction(
  '[Heroe] -  FIND HEROE SUCCESS',
  props<{ data: HeroesData }>()
);
