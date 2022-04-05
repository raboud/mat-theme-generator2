import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-mat-theme',
  templateUrl: './mat-theme.component.html',
  styleUrls: ['./mat-theme.component.scss']
})
export class MatThemeComponent implements OnInit {

  constructor(public themeService: ThemeService) {
  }

  ngOnInit() {
  }

}
