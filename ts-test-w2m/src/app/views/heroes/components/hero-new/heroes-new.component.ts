import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { NewHeroForm } from 'src/app/shared/models/forms';
import { addHeroe } from 'src/app/store/heroes.actions';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.scss'],
})
export class HeroNewComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  form: FormGroup<NewHeroForm> = this.fb.group({
    heroName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    description: [''],
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
          heroName: this.form.value.heroName,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          description: this.form.value.description,
        },
      })
    );
    this.goBack();
  }
}
