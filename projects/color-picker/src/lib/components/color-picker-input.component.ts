import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {  NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
    selector: 'color-input',
    styles: [`
    .color-picker
    {  border: black solid 1px;
    border-radius: 5px;
    width: 30px;
    height: 20px;
    display: block;
    margin-bottom: 30px;
    cursor: pointer; }`],
    template: ``,
    providers: [{
        provide: NG_VALUE_ACCESSOR, useExisting:
        forwardRef(() => ColorPickerInputComponent),
        multi: true
    }]
})
export class ColorPickerInputComponent implements OnInit, ControlValueAccessor {

    @Input('name') name: string = "";
    @Input('id') id: string = "";
    @Input('cpToggle') cpToggle: boolean = false;
    @Output('cpToggleChange') cpToggleChange = new EventEmitter<boolean>(true);
    @Input('cpPosition') cpPosition: string = 'right';
    @Input('cpPositionOffset') cpPositionOffset: string = '0%';
    @Input('cpPositionRelativeToArrow') cpPositionRelativeToArrow: boolean = false;
    @Input('cpOutputFormat') cpOutputFormat: string = 'hex';
    @Input('cpPresetLabel') cpPresetLabel: string = 'Preset colors';
    @Input('cpPresetColors') cpPresetColors: Array<string> = [];
    @Input('cpCancelButton') cpCancelButton: boolean = false;
    @Input('cpCancelButtonClass') cpCancelButtonClass: string = 'cp-cancel-button-class';
    @Input('cpCancelButtonText') cpCancelButtonText: string = 'Cancel';
    @Input('cpOKButton') cpOKButton: boolean = false;
    @Input('cpOKButtonClass') cpOKButtonClass: string = 'cp-ok-button-class';
    @Input('cpOKButtonText') cpOKButtonText: string = 'OK';
    @Input('cpFallbackColor') cpFallbackColor: string = '#fff';
    @Input('cpHeight') cpHeight: string = 'auto';
    @Input('cpWidth') cpWidth: string = '230px';
    @Input('cpIgnoredElements') cpIgnoredElements: any = [];
    @Input('cpDialogDisplay') cpDialogDisplay: string = 'popup';
    @Input('cpSaveClickOutside') cpSaveClickOutside: boolean = true;
    @Input('cpAlphaChannel') cpAlphaChannel: string = 'hex6';
    @Input() required: Boolean = false;
    @Input() itemClass: string ="color-picker";
    _value: any;
    _disabled: any;

    set value(val: any) {
        this._value = val;
        this.onModelChange(val);
    }

    get value(): any {
        return this._value;
    }

    @Input()
    get disabled() { return this._disabled; }
    set disabled(value: any) {
        this._disabled = value;
    }


    constructor() { }

    ngOnInit() { }

    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    writeValue(val: any): void {
        this.value = val;
    }


    colorPickerChange(color:any)
    {
         this.onModelChange(color);
    }

}
