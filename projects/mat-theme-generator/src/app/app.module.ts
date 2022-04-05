import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Angulartics2Module } from 'angulartics2';
//import { PrismModule } from '@ngx-prism/core';
import { NgxCopyPasteModule } from 'ngx-copypaste';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';
import { HomeComponent } from './components/home/home.component';
import { MatThemeComponent } from './components/mat-theme/mat-theme.component';
import { MatWidgetsComponent } from './components/mat-widgets/mat-widgets.component';
import { PrebuiltThemeComponent } from './components/prebuilt-theme/prebuilt-theme.component';
import { ColorPickerModule } from 'ColorPicker';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { ThemeService } from './services/theme.service';
import { PaletteComponent } from './components/palatte/palette.component';
import { PrismComponent } from './components/prism/prism.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,

    ColorPaletteComponent,
    HomeComponent,
    MatThemeComponent,
    MatWidgetsComponent,
    AutocompleteComponent,
    ProgressbarComponent,
    PrebuiltThemeComponent,
    PaletteComponent,
    PrismComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
//    PrismModule,
    NgxCopyPasteModule,
    HttpClientModule,

    ColorPickerModule

  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
