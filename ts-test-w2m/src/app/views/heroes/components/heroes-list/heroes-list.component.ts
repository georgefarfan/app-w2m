import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, debounceTime } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { Hero } from 'src/app/shared/models/heroes';
import { removeHeroe } from 'src/app/store/heroes.actions';
import { HeroesData } from 'src/app/store/heroes.model';
import { selectHeroesData } from 'src/app/store/heroes.selector';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  filterValue: string = '';
  displayedColumns: string[] = [
    'heroName',
    'firstName',
    'lastName',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<Hero>([]);
  data$: Observable<HeroesData> = this.store.select(selectHeroesData);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  textControl = new FormControl();

  constructor(
    private store: Store<{}>,
    private router: Router,
    public dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.data$.subscribe((dataValues) => {
      this.dataSource.data = dataValues.heroes;
    });

    this.textControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    });
  }

  ngOnDestroy(): void {}

  onNewHeroe(): void {
    this.router.navigate(['/new']);
  }

  onEdit(hero: Hero): void {
    this.router.navigate([`/detail/${hero.id}`]);
  }

  onDelete(hero: Hero): void {
    const dialogRef = this.dialog.open(BaseDialogComponent, {
      width: '450px',
      data: {
        title: this.translateService.instant('HEROES.REMOVE.TITLE'),
        description: this.translateService.instant(
          'HEROES.REMOVE.DESCRIPTION',
          {
            x: hero.heroName,
          }
        ),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        this.store.dispatch(
          removeHeroe({
            data: hero,
          })
        );
      }
    });
  }
}
