import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';
import { ColorPickerModule } from 'ColorPicker';
import { NgxCopyPasteModule } from 'ngx-copypaste';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';
import { MatThemeComponent } from '../mat-theme/mat-theme.component';
import { MatWidgetsComponent } from '../mat-widgets/mat-widgets.component';
import { PaletteComponent } from '../palatte/palette.component';
import { PrebuiltThemeComponent } from '../prebuilt-theme/prebuilt-theme.component';
import { PrismComponent } from '../prism/prism.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,

        ColorPaletteComponent,
        MatThemeComponent,
        MatWidgetsComponent,
        AutocompleteComponent,
        ProgressbarComponent,
        PrebuiltThemeComponent,
        PaletteComponent,
        PrismComponent
           ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatRadioModule,
        MatMenuModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatToolbarModule,

        Angulartics2Module.forRoot(),
        NgxCopyPasteModule,
        HttpClientModule,
        RouterTestingModule,
        ColorPickerModule      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
