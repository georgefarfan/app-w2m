import { createAction, props } from '@ngrx/store';
import { HeroesData } from './heroes.model';
import { Hero } from '../shared/models/heroes';

export const init = createAction('[Heroes] -  INIT', props<{ data: any }>());

export const heroesList = createAction('[Heroes] -  LOAD LIST');
export const heroesListSuccess = createAction(
  '[Heroes] -  LOAD LIST SUCCESS',
  props<{ data: HeroesData }>()
);

export const addHeroe = createAction(
  '[Heroes] -  ADD HERO',
  props<{ data: Hero }>()
);

export const addHeroeSuccess = createAction(
  '[Heroe] -  ADD HERO SUCCESS',
  props<{
    data: {
      heroes: HeroesData;
      message: string;
    };
  }>()
);

export const updateHeroe = createAction(
  '[Heroes] -  UPDATE HERO',
  props<{
    data: Hero;
  }>()
);

export const updateHeroeSuccess = createAction(
  '[Heroe] -  UPDATE HERO SUCCESS',
  props<{
    data: {
      heroes: HeroesData;
      message: string;
    };
  }>()
);

export const removeHeroe = createAction(
  '[Heroes] -  REMOVE HERO',
  props<{
    data: Hero;
  }>()
);

export const removeHeroeSuccess = createAction(
  '[Heroe] -  REMOVE HERO SUCCESS',
  props<{
    data: {
      heroes: HeroesData;
      message: string;
    };
  }>()
);

export const findHeroe = createAction(
  '[Heroe] -  FIND HERO',
  props<{
    data: {
      id: string;
    };
  }>()
);

export const findHeroeSuccess = createAction(
  '[Heroe] -  FIND HERO SUCCESS',
  props<{ data: Hero }>()
);
