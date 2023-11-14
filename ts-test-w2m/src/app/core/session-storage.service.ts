import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { heroesList } from '../store/heroes.actions';
import { HeroesData } from '../store/heroes.model';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  public heroesList$: BehaviorSubject<HeroesData | null>;

  constructor(private store: Store<{}>) {
    this.heroesList$ = new BehaviorSubject<HeroesData | null>(null);
  }

  initialize(): void {
    this.store.dispatch(heroesList());
  }

  getHeroes(): Observable<HeroesData> {
    return localStorage && localStorage['heroes']
      ? of(JSON.parse(localStorage['heroes']))
      : of({
          heroes: [],
          pageSize: 1,
          current_page: 1,
        });
  }

  setHeroes(data: HeroesData): void {
    localStorage.setItem('heroes', JSON.stringify(data));
  }
}
