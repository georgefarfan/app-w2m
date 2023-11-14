import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, distinctUntilChanged, filter, map } from 'rxjs';
import { EditHeroForm } from 'src/app/shared/models/forms';
import { Hero } from 'src/app/shared/models/heroes';
import { updateHeroe, findHeroe } from 'src/app/store/heroes.actions';
import { selectHeroe } from 'src/app/store/heroes.selector';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private _id: string = '';
  form: FormGroup<EditHeroForm> = this.fb.group({
    id: ['', Validators.required],
    heroName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    description: [''],
  });
  heroeSelected$: Observable<Hero> = this.store.select(selectHeroe);

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
        this.store.dispatch(
          findHeroe({
            data: {
              id,
            },
          })
        );
      });

    this.heroeSelected$.subscribe((heroe) => {
      this.form.patchValue({
        id: heroe.id,
        heroName: heroe.heroName,
        firstName: heroe.firstName,
        lastName: heroe.lastName,
        description: heroe.description,
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
          heroName: this.form.value.heroName,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          description: this.form.value.description,
        },
      })
    );

    this.goBack();
  }

  ngOnDestroy(): void {}
}
