import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectLoading, selectMessage } from './store/heroes.selector';
import { Observable, skip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  message$: Observable<string> = this.store.select(selectMessage);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(
    private cdref: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    this.message$.pipe(skip(1)).subscribe((message) => {
      this.openSnackBar(message);
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
