import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewContainerRef } from "@angular/core";
import { Hsva } from "../classes";
import { ColorPickerComponent } from "../components/color-picker.component";

@Directive({
    selector: '[colorPicker]',
    host: {
        '(input)': 'changeInput($event.target.value)',
        '(click)': 'onClick()'
    }
})
export class ColorPickerDirective implements OnInit, OnChanges {
    @Input('colorPicker') colorPicker: string = "";
    @Output('colorPickerChange') colorPickerChange = new EventEmitter<string>(true);
    @Input('cpToggle') cpToggle: boolean = false;
    @Output('cpToggleChange') cpToggleChange = new EventEmitter<boolean>(true);
    @Input('cpPosition') cpPosition: string = 'right';
    @Input('cpPositionOffset') cpPositionOffset: string = '0%';
    @Input('cpPositionRelativeToArrow') cpPositionRelativeToArrow: boolean = false;
    @Input('cpOutputFormat') cpOutputFormat: string = 'hex';
    @Input('cpPresetLabel') cpPresetLabel: string = 'Preset colors';
    @Input('cpPresetColors') cpPresetColors: Array<string> =[] ;
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

    private dialog: any;
    private created: boolean;
    private ignoreChanges: boolean = false;

    constructor(private vcRef: ViewContainerRef,
        private el: ElementRef) {
        this.created = false;
    }

    ngOnChanges(changes: any): void {
        if (changes.cpToggle) {
            if (changes.cpToggle.currentValue) this.openDialog();
            if (!changes.cpToggle.currentValue && this.dialog) this.dialog.closeColorPicker();
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);

            }
            this.ignoreChanges = false;
        }
    }

    ngOnInit() {

    }

    checkInitValue() {
        let hsva = Hsva.parse(this.colorPicker);
        if (hsva === null) hsva = Hsva.parse(this.colorPicker, true);
        if (hsva == null) {
            hsva = Hsva.parse(this.cpFallbackColor);
        }
        if (hsva != null) {
            this.colorPickerChange.emit(hsva.toString(this.cpOutputFormat, this.cpAlphaChannel === 'hex8'));
        }
    }

    onClick() {
        if (this.cpIgnoredElements.filter((item: any) => item === this.el.nativeElement).length === 0) {
            this.openDialog();
        }
    }

    openDialog() {
        if (!this.created) {
            this.created = true;

            const cmpRef = this.vcRef.createComponent(ColorPickerComponent);
            cmpRef.instance.setDialog(this, this.el, this.colorPicker || this.cpFallbackColor, this.cpPosition, this.cpPositionOffset,
                this.cpPositionRelativeToArrow, this.cpOutputFormat, this.cpPresetLabel, this.cpPresetColors,
                this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText,
                this.cpOKButton, this.cpOKButtonClass, this.cpOKButtonText, this.cpHeight, this.cpWidth,
                this.cpIgnoredElements, this.cpDialogDisplay, this.cpSaveClickOutside, this.cpAlphaChannel);
            this.dialog = cmpRef.instance;

        } else if (this.dialog) {
            this.dialog.openDialog(this.colorPicker);
        }
    }

    colorChanged(value: string, ignore: boolean = true) {
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value)
    }

    changeInput(value: string) {
        this.dialog.setColorFromString(value, true);
    }

    toggle(value: boolean) {
        this.cpToggleChange.emit(value);
    }
}
