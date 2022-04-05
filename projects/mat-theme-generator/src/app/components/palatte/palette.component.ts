import { Component, OnInit } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { ThemeService } from '../../services/theme.service';
import { Palette } from '../../models/theme-model';

export interface PaletteColor {
  title: string,
  property: keyof Palette,
  textProperty: keyof Palette,
}

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {
  color: string = "";

  PALETTE_COLORS: PaletteColor[] = [
    {
      title: 'Primary',
      property: 'primaryColor',
      textProperty: 'primaryColorText',
    },
    {
      title: 'Primary Light',
      property: 'primaryLightColor',
      textProperty: 'primaryLightColorText',
    },
    {
      title: 'Primary Dark',
      property: 'primaryDarkColor',
      textProperty: 'primaryDarkColorText',
    },
    {
      title: 'Accent',
      property: 'accentColor',
      textProperty: 'accentColorText',
    },
    {
      title: 'Accent Light',
      property: 'accentLightColor',
      textProperty: 'accentLightColorText',
    },
    {
      title: 'Accent Dark',
      property: 'accentDarkColor',
      textProperty: 'accentDarkColorText',
    }
  ];

  constructor(public themeService: ThemeService, private angulartics: Angulartics2) { }

  ngOnInit() {

  }

  changeColor(colorType: string, color: string) {
    this.themeService.setColor(colorType, color);
    this.angulartics.eventTrack.next(
      { action: 'changeColor', properties: { category: 'customizeTheme', label: colorType }}
    );
  }
}
