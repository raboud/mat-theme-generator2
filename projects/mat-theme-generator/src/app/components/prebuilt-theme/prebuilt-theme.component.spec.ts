import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { PrebuiltThemeComponent } from './prebuilt-theme.component';

describe('PrebuiltThemeComponent', () => {
  let component: PrebuiltThemeComponent;
  let fixture: ComponentFixture<PrebuiltThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebuiltThemeComponent ],
      imports: [
        MatMenuModule,
        MatIconModule,
        MatGridListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
