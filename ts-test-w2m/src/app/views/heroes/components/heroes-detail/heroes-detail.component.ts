import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, distinctUntilChanged, filter, map } from 'rxjs';
import { EditHeroeForm } from 'src/app/shared/models/forms';
import { Heroe } from 'src/app/shared/models/heroes';
import { updateHeroe, findHeroe } from 'src/app/store/heroes.actions';
import { selectHeroe } from 'src/app/store/heroes.selector';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss'],
})
export class HeroesDetailComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private _id: string = '';
  form: FormGroup<EditHeroeForm> = this.fb.group({
    id: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  heroeSelected$: Observable<Heroe> = this.store.select(selectHeroe);

  constructor(
    private store: Store<{}>,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadValues();
  }

  loadValues(): void {
    this.activatedRoute.params
      .pipe(
        distinctUntilChanged(),
        filter((params) => params['id']),
        map((params) => params['id'])
      )
      .subscribe((id: string) => {
        this._id = id;
        this.store.dispatch(
          findHeroe({
            data: {
              id: this._id,
            },
          })
        );
      });

    this.heroeSelected$.subscribe((heroe) => {
      this.form.patchValue({
        id: heroe.id,
        firstName: heroe.firstName,
        lastName: heroe.lastName,
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    this.store.dispatch(
      updateHeroe({
        data: {
          id: this.form.value.id,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
        },
      })
    );

    this.goBack();
  }

  ngOnDestroy(): void {}
}
