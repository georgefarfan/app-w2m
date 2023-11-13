import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Heroe } from 'src/app/shared/interfaces/heroes';
import { removeHeroe } from 'src/app/store/heroes.actions';
import { HeroesData } from 'src/app/store/heroes.model';
import { selectHeroesData } from 'src/app/store/heroes.selector';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Heroe>([]);
  data$: Observable<HeroesData> = this.store.select(selectHeroesData);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private store: Store<{}>, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.data$.subscribe((dataValues) => {
      this.dataSource.data = dataValues.heroes;
    });
  }

  onNewHeroe(): void {
    this.router.navigate(['/new']);
  }

  onDelete(heroe: Heroe): void {
    this.store.dispatch(
      removeHeroe({
        data: heroe,
      })
    );
  }
}
