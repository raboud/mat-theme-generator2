import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { Theme } from '../../models/theme-model';
import PREBUILT_THEMES from './prebuilt-themes';


@Component({
  selector: 'app-prebuilt-theme',
  templateUrl: './prebuilt-theme.component.html',
  styleUrls: ['./prebuilt-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrebuiltThemeComponent implements OnInit {
  themes: Theme[] = PREBUILT_THEMES;

  @Input()
  currentTheme!: Theme | null;

  @Output()
  change = new EventEmitter<Theme>();

  constructor() { }

  ngOnInit() {
  }

  changeTheme(theme: Theme) {
    this.change.emit(theme);
  }

}
