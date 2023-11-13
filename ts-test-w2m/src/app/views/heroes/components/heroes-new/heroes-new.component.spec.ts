import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesNewComponent } from './heroes-new.component';

describe('HeroesNewComponent', () => {
  let component: HeroesNewComponent;
  let fixture: ComponentFixture<HeroesNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesNewComponent]
    });
    fixture = TestBed.createComponent(HeroesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
