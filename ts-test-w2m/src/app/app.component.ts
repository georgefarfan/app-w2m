import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectLoading, selectMessage } from './store/heroes.selector';
import { Observable, skip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  message$: Observable<string> = this.store.select(selectMessage);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private snackBar: MatSnackBar, private store: Store<{}>) {}

  ngOnInit(): void {
    this.message$.pipe(skip(1)).subscribe((message) => {
      this.openSnackBar(message);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
