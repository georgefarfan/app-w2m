import { Heroe } from '../shared/models/heroes';

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}
export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// Helper function to extract error, if there is one.
export function getError(callState: CallState): string | null {
  if ((callState as ErrorState).errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }
  return null;
}

export interface HeroesData {
  heroes: Heroe[];
  pageSize: number;
  current_page: number;
}
