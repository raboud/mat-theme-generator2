import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Theme } from '../../models/theme-model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  darkMode: boolean = true;
  constructor(public themeService: ThemeService) { }

  ngOnInit() {
  }

  toggleDarkMode(slideToggleChangeEvent: MatSlideToggleChange) {
    this.themeService.setDarkMode(slideToggleChangeEvent.checked);
  }

  installTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
