import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroesState } from './heroes.reducer';
import { HeroesData } from './heroes.model';

export const featureKey = 'heroes';

export const selectHeroes = createFeatureSelector<HeroesState>(featureKey);

export const selectHeroesData = createSelector(
  selectHeroes,
  (state: HeroesState): HeroesData => state.data
);
