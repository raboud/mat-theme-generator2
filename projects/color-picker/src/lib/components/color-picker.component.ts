import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Hsla, Hsva, Rgba, SliderDimension, SliderPosition } from "../classes";

@Component({
    selector: 'color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})

export class ColorPickerComponent implements OnInit, AfterViewInit {
    public hsva: Hsva = new Hsva(0,0,0,0);
    public rgbaText: Rgba = new Rgba(0,0,0,0);
    public hslaText: Hsla = new Hsla(0,0,0,0);
    public hexText: string = "";
    public outputColor: string = "";
    public selectedColor: string = "";
    public alphaSliderColor: string = "";
    public hueSliderColor: string = "";
    public slider: SliderPosition = new SliderPosition(0,0,0,0);
    public sliderDimMax: SliderDimension = new SliderDimension(0,0,0,0);
    public format: number = 0;
    public show: boolean = false;
    public top: number = 0;
    public left: number = 0;
    public position: string = "";
    public directiveInstance: any;
    public initialColor: string = "";
    public directiveElementRef!: ElementRef;

    public listenerMouseDown: any;
    public listenerResize: any;

    public cpPosition: string = "";
    public cpPositionOffset: number = 0;
    public cpOutputFormat: string = "";
    public cpPresetLabel: string = "";
    public cpPresetColors: Array<string> = [];
    public cpCancelButton: boolean = false;
    public cpCancelButtonClass: string = "";
    public cpCancelButtonText: string = "";
    public cpOKButton: boolean = false;
    public cpOKButtonClass: string = "";
    public cpOKButtonText: string = "";
    public cpHeight: number = 0;
    public cpWidth: number = 0;
    public cpIgnoredElements: any;
    public cpDialogDisplay: string = "";
    public cpSaveClickOutside: boolean = false; 
    public cpAlphaChannel: string = "";

    public dialogArrowSize: number = 10;
    public dialogArrowOffset: number = 15;
    public arrowTop: number = 0;

    @ViewChild('hueSlider', { static: true }) hueSlider!: ElementRef;
    @ViewChild('alphaSlider', { static: true }) alphaSlider!: ElementRef;

    @ViewChild('dialogPopup', { static: true }) dialogElement!: ElementRef;

    constructor(private el: ElementRef) { }

    setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpPositionOffset: string,
        cpPositionRelativeToArrow: boolean, cpOutputFormat: string, cpPresetLabel: string, cpPresetColors: Array<string>,
        cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string,
        cpOKButton: boolean, cpOKButtonClass: string, cpOKButtonText: string,
        cpHeight: string, cpWidth: string,
        cpIgnoredElements: any, cpDialogDisplay: string, cpSaveClickOutside: boolean, cpAlphaChannel: string) {
        this.directiveInstance = instance;
        this.initialColor = color;
        this.directiveElementRef = elementRef;
        this.cpPosition = cpPosition;
        this.cpPositionOffset = parseInt(cpPositionOffset);
        if (!cpPositionRelativeToArrow) {
            this.dialogArrowOffset = 0;
        }
        this.cpOutputFormat = cpOutputFormat;
        this.cpPresetLabel = cpPresetLabel;
        this.cpPresetColors = cpPresetColors;
        this.cpCancelButton = cpCancelButton;
        this.cpCancelButtonClass = cpCancelButtonClass;
        this.cpCancelButtonText = cpCancelButtonText;
        this.cpOKButton = cpOKButton;
        this.cpOKButtonClass = cpOKButtonClass;
        this.cpOKButtonText = cpOKButtonText;
        this.cpHeight = parseInt(cpHeight);
        this.cpWidth = parseInt(cpWidth);
        this.cpIgnoredElements = cpIgnoredElements;
        this.cpDialogDisplay = cpDialogDisplay;
        if (this.cpDialogDisplay === 'inline') {
            this.dialogArrowOffset = 0;
            this.dialogArrowSize = 0;
        }
        this.cpSaveClickOutside = cpSaveClickOutside;
        this.cpAlphaChannel = cpAlphaChannel;
    }

    ngAfterViewInit() { }

    ngOnInit(): void {

        console.log(this.alphaSlider);
        console.log(this.hueSlider);


        let alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
        let hueWidth = this.hueSlider.nativeElement.offsetWidth;
        this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cpOutputFormat === 'rgba') {
            this.format = 1;
        } else if (this.cpOutputFormat === 'hsla') {
            this.format = 2;
        } else {
            this.format = 0;
        }
        this.listenerMouseDown = (event: any) => { this.onMouseDown(event) };
        this.listenerResize = () => { this.onResize() };
        this.openDialog(this.initialColor, false);
    }

    setInitialColor(color: any) {
        this.initialColor = color;
    }

    openDialog(color: any, emit: boolean = true) {
        this.setInitialColor(color);
        this.setColorFromString(color, emit);
        this.openColorPicker();
    }

    cancelColor() {
        this.setColorFromString(this.initialColor, true);
        if (this.cpDialogDisplay === 'popup') {
            this.directiveInstance.colorChanged(this.initialColor, true);
            this.closeColorPicker();
        }
    }

    oKColor() {
        if (this.cpDialogDisplay === 'popup') {
            this.closeColorPicker();
        }
    }

    setColorFromString(value: string, emit: boolean = true) {
        let hsva: Hsva | null;
        if (this.cpAlphaChannel === 'hex8') {
            hsva = Hsva.parse(value, true);
            if (!hsva && !this.hsva) {
                hsva = Hsva.parse(value, false);
            }
        } else {
            hsva = Hsva.parse(value, false);
        }
        if (hsva) {
            this.hsva = hsva;
            this.update(emit);
        }
    }

    onMouseDown(event: any) {
        if ((!this.isDescendant(this.el.nativeElement, event.target)
            && event.target != this.directiveElementRef.nativeElement &&
            this.cpIgnoredElements.filter((item: any) => item === event.target).length === 0) && this.cpDialogDisplay === 'popup') {
            if (!this.cpSaveClickOutside) {
                this.setColorFromString(this.initialColor, false);
                this.directiveInstance.colorChanged(this.initialColor)
            }
            this.closeColorPicker();
        }
    }

    openColorPicker() {
        if (!this.show) {
            this.setDialogPosition();
            this.show = true;
            this.directiveInstance.toggle(true);
            document.addEventListener('mousedown', this.listenerMouseDown);
            window.addEventListener('resize', this.listenerResize);
        }
    }

    closeColorPicker() {
        if (this.show) {
            this.show = false;
            this.directiveInstance.toggle(false);
            document.removeEventListener('mousedown', this.listenerMouseDown);
            window.removeEventListener('resize', this.listenerResize);
        }
    }

    onResize() {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
    }

    setDialogPosition() {
        let dialogHeight = this.dialogElement.nativeElement.offsetHeight;
        let node = this.directiveElementRef.nativeElement, position = 'static';
        let parentNode: any = null;
        while (node !== null && node.tagName !== 'HTML') {
            position = window.getComputedStyle(node).getPropertyValue("position");
            if (position !== 'static' && parentNode === null) {
                parentNode = node;
            }
            if (position === 'fixed') {
                break;
            }
            node = node.parentNode;
        }
        if (position !== 'fixed') {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, true);
            if (parentNode === null) { parentNode = node }
            var boxParent = this.createBox(parentNode, true);
            this.top = boxDirective.top - boxParent.top;
            this.left = boxDirective.left - boxParent.left;
        } else {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, false);
            this.top = boxDirective.top;
            this.left = boxDirective.left;
            this.position = 'fixed';
        }
        if (this.cpPosition === 'left') {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left -= this.cpWidth + this.dialogArrowSize - 2;
        } else if (this.cpPosition === 'top') {
            this.top -= dialogHeight + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            this.arrowTop = dialogHeight - 1;
        } else if (this.cpPosition === 'bottom') {
            this.top += boxDirective.height + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
        } else {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left += boxDirective.width + this.dialogArrowSize;
        }
    }

    setSaturation(val: { v: number, rg: number }) {
        let hsla = this.hsva.toHsla();
        hsla.s = val.v / val.rg;
        this.hsva = hsla.toHsva();
        this.update();
    }

    setLightness(val: { v: number, rg: number }) {
        let hsla = this.hsva.toHsla();
        hsla.l = val.v / val.rg;
        this.hsva = hsla.toHsva();
        this.update();
    }

    setHue(val: { v: number, rg: number }) {
        this.hsva.h = val.v / val.rg;
        this.update();
    }

    setAlpha(val: { v: number, rg: number }) {
        this.hsva.a = val.v / val.rg;
        this.update();
    }

    setR(val: { v: number, rg: number }) {
        let rgba = this.hsva.toRgba();
        rgba.r = val.v / val.rg;
        this.hsva = rgba.toHsva();
        this.update();
    }
    setG(val: { v: number, rg: number }) {
        let rgba = this.hsva.toRgba();
        rgba.g = val.v / val.rg;
        this.hsva = rgba.toHsva();
        this.update();
    }
    setB(val: { v: number, rg: number }) {
        let rgba = this.hsva.toRgba();
        rgba.b = val.v / val.rg;
        this.hsva = rgba.toHsva();
        this.update();
    }

    setSaturationAndBrightness(val: { s: number, v: number, rgX: number, rgY: number }) {
        this.hsva.s = val.s / val.rgX;
        this.hsva.v = val.v / val.rgY;
        this.update();
    }

    formatPolicy(): number {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
            this.format++;
        }
        return this.format;
    }

    update(emit: boolean = true) {
        let hsla = this.hsva.toHsla();
        let rgba = this.hsva.toRgba().denormalizeRGBA();
        let hueRgba = (new Hsva(this.hsva.h, 1, 1, 1)).toRgba().denormalizeRGBA();

        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this.hexText = rgba.toString(this.cpAlphaChannel === 'hex8');

        this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';

        if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
            this.format++;
        }

        let lastOutput = this.outputColor;
        this.outputColor = this.hsva.toString(this.cpOutputFormat, this.cpAlphaChannel === 'hex8');
        this.selectedColor = this.hsva.toString('rgba', false);

        this.slider = new SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8,
            (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8)

        if (emit && lastOutput !== this.outputColor) {
            this.directiveInstance.colorChanged(this.outputColor);
        }
    }

    isDescendant(parent: any, child: any): boolean {
        let node: any = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    createBox(element: any, offset: boolean): any {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }
}