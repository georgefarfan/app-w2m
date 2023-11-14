import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { NewHeroeForm } from 'src/app/shared/models/forms';
import { addHeroe } from 'src/app/store/heroes.actions';

@Component({
  selector: 'app-heroes-new',
  templateUrl: './heroes-new.component.html',
  styleUrls: ['./heroes-new.component.scss'],
})
export class HeroesNewComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  form: FormGroup<NewHeroeForm> = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private store: Store<{}>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    this.store.dispatch(
      addHeroe({
        data: {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
        },
      })
    );
    this.goBack();
  }
}
