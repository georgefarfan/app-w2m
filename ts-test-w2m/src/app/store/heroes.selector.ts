import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroesState } from './heroes.reducer';
import { HeroesData, LoadingState } from './heroes.model';
import { Hero } from '../shared/models/heroes';

export const featureKey = 'heroes';

export const selectHeroes = createFeatureSelector<HeroesState>(featureKey);

export const selectHeroesData = createSelector(
  selectHeroes,
  (state: HeroesState): HeroesData => state.data
);

export const selectMessage = createSelector(
  selectHeroes,
  (state: HeroesState): string => state.action.message
);

export const selectHeroe = createSelector(
  selectHeroes,
  (state: HeroesState): Hero => state.heroeSelected
);

export const selectLoading = createSelector(
  selectHeroes,
  (state: HeroesState): boolean => state.callState === LoadingState.LOADING
);
