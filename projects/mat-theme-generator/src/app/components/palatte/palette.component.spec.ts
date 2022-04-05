import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { ColorPickerModule } from 'ColorPicker';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';

import { PaletteComponent } from './palette.component';

describe('PalatteComponent', () => {
  let component: PaletteComponent;
  let fixture: ComponentFixture<PaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaletteComponent,
        ColorPaletteComponent
       ],
      imports: [
        MatIconModule,
      Angulartics2Module.forRoot(),
      RouterModule.forRoot([]),

      ColorPickerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
