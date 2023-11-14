import { createReducer, on } from '@ngrx/store';
import { CallState, HeroesData, LoadingState } from './heroes.model';
import * as Actions from './heroes.actions';
import { Heroe } from '../shared/models/heroes';

export interface HeroesState {
  data: HeroesData;
  action: {
    message: string;
  };
  heroeSelected: Heroe;
  callState: CallState;
}

export const HEROES_INITIAL_STATE: HeroesState = {
  data: {
    heroes: [],
    pageSize: 1,
    current_page: 1,
  },
  heroeSelected: {
    id: '',
    firstName: '',
    lastName: '',
    description: '',
  },
  action: {
    message: '',
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

  on(
    Actions.heroesList,
    Actions.addHeroe,
    Actions.removeHeroe,
    Actions.findHeroe,
    Actions.updateHeroe,
    (state) => ({
      ...state,
      callState: LoadingState.LOADING,
    })
  ),

  on(Actions.findHeroeSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    heroeSelected: action.data,
  })),

  on(Actions.heroesListSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    data: action.data,
  })),

  on(
    Actions.addHeroeSuccess,
    Actions.removeHeroeSuccess,
    Actions.updateHeroeSuccess,
    (state, action) => ({
      ...state,
      callState: LoadingState.LOADED,
      data: action.data.heroes,
      action: {
        message: action.data.message,
      },
    })
  )
);
