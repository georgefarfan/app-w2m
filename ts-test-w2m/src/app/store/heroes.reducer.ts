import { createReducer, on } from '@ngrx/store';
import { CallState, HeroesData, LoadingState } from './heroes.model';
import * as Actions from './heroes.actions';

export interface HeroesState {
  data: HeroesData;
  callState: CallState;
}

export const HEROES_INITIAL_STATE: HeroesState = {
  data: {
    heroes: [],
    pageSize: 1,
    current_page: 1,
  },
  callState: LoadingState.INIT,
};

export const initialState: HeroesState = HEROES_INITIAL_STATE;

export const heroesReducer = createReducer(
  initialState,
  on(Actions.init, (state) => ({
    ...state,
    callState: LoadingState.INIT,
  })),

  on(Actions.heroesList, Actions.addHeroe, Actions.removeHeroe, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  on(
    Actions.heroesListSuccess,
    Actions.addHeroeSuccess,
    Actions.removeHeroeSuccess,
    (state, action) => ({
      ...state,
      callState: LoadingState.LOADED,
      data: action.data,
    })
  )
);
