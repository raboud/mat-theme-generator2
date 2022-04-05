# color-picker
Angular 13 Color Picker Directive/Component with no dependencies required.<br />
This is a Color Picker Directive/Component for Angular 13.

# Demo page
https://abadakhshan.github.io/narik-angular-color-picker/

# Installation
```bash
npm i --save narik-angular-color-picker
```

# Usage
* Use it in your HTML elements, for example:
```html
<color-input [itemClass]='color-picker'   [(ngModel)]="color"></color-input>
```
* Or:
```html
<input [(colorPicker)]="color" [style.background]="color" [value]="color"/>
```
* Or:
```html
<input [colorPicker]="color" (colorPickerChange)="color=$event" [style.background]="color" [value]="color"/>
```

* Add ColorPickerModule in your app.module.ts:
```javascript
import {ColorPickerModule} from 'narik-angular-color-picker';

@NgModule({
    ...
    imports: [ColorPickerModule]
})

```
* Set color the variable. You can use ColorPickerService in your component if you want extra functions.
```javascript
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/demo.html'
})

export class AppComponent {
    private color: string = "#127bdc";
    constructor(private cpService: ColorPickerService) {
    }
}
```
* Configure system.config.js
```javascript
var map = {
        ...    
        'narik-angular-color-picker': 'node_modules/narik-angular-color-picker',
    };
var packages = {
        ...
        'narik-angular-color-picker': {main: 'dist/umd/narik-angular-color-picker', defaultExtension: 'js'}
    };
```
#Build
```bash
git clone https://github.com/abadakhshan/narik-angular-color-picker
npm install
cd narik-angular-color-picker
npm run build:dist

```

#Options
Default option is the first item.
```html
[cpOutputFormat]="'hex', 'rgba', 'hsla'"
[cpPosition]="'right', 'left', 'top', 'bottom'"
[cpPositionOffset]="'0%'"
[cpPositionRelativeToArrow]="false, true"
[cpWidth]="'230px'"
[cpHeight]="'auto'"
[cpSaveClickOutside]="true, false"
[cpOKButton]="false, true"
[cpOKButtonClass]="''"
[cpOKButtonText]="'OK'"
[cpCancelButton]="false, true"
[cpCancelButtonClass]="''"
[cpCancelButtonText]="'Cancel'"
[cpFallbackColor]="'#fff'"
[cpPresetLabel]="'Preset colors'"
[cpPresetColors]="[]", e.g: "['#fff', '#000']"
[cpToggle] = "false, true"
[cpIgnoredElements]="[]"
[cpDialogDisplay]="'popup,' 'inline'"
[cpAlphaChannel]="'hex6', 'hex8', 'disabled'"
```


#Tested in:
* Chrome
* Firefox
* Microsoft Edge
* Opera
* Safari
* Internet Explorer
