import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroNewComponent } from './heroes-new.component';

describe('HeroNewComponent', () => {
  let component: HeroNewComponent;
  let fixture: ComponentFixture<HeroNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroNewComponent],
    });
    fixture = TestBed.createComponent(HeroNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
