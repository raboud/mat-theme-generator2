import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatThemeComponent } from './mat-theme.component';

describe('MatThemeComponent', () => {
  let component: MatThemeComponent;
  let fixture: ComponentFixture<MatThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatThemeComponent ],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
