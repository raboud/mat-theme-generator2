import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerInputComponent} from './components/color-picker-input.component'
import { ColorPickerDirective } from './directives/color-picker.directive';
import { ColorPickerComponent } from './components/color-picker.component';
import { SliderDirective } from './directives/slider.directive';
import { TextDirective } from './directives/text.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
    ],
    declarations: [
        ColorPickerDirective,
        ColorPickerInputComponent,
        SliderDirective,
        TextDirective, 
        ColorPickerComponent
    ],
    exports: [
        ColorPickerDirective,ColorPickerInputComponent
    ],
    entryComponents : [
        ColorPickerComponent
    ]
})
export class ColorPickerModule {}
