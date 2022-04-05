export class Hsva {
    constructor(public h: number, public s: number, public v: number, public a: number) { }

    toRgba(): Rgba {
        //        let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        let r: number, g: number, b: number;

        let i = Math.floor(this.h * 6);
        let f = this.h * 6 - i;
        let p = this.v * (1 - this.s);
        let q = this.v * (1 - f * this.s);
        let t = this.v * (1 - (1 - f) * this.s);

        switch (i % 6) {
            case 0:
                r = this.v, g = t, b = p;
                break;
            case 1:
                r = q, g = this.v, b = p;
                break;
            case 2:
                r = p, g = this.v, b = t;
                break;
            case 3:
                r = p, g = q, b = this.v;
                break;
            case 4:
                r = t, g = p, b = this.v;
                break;
            default:
            case 5:
                r = this.v, g = p, b = q;
                break;
        }

        return new Rgba(r, g, b, this.a)
    }

    toHsla(): Hsla {
        let h = this.h, s = this.s, v = this.v, a = this.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a)
        } else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a)
        } else {
            let l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a)
        }
    }


    public static parse(colorString: string = '', hex8: boolean = false): Hsva | null {
        let stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult: any) {
                    return new Rgba(parseInt(execResult[2]) / 255,
                        parseInt(execResult[3]) / 255,
                        parseInt(execResult[4]) / 255,
                        isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult: any) {
                    return new Hsla(parseInt(execResult[2]) / 360,
                        parseInt(execResult[3]) / 100,
                        parseInt(execResult[4]) / 100,
                        isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            }
        ];
        if (hex8) {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult: any) {
                    return new Rgba(parseInt(execResult[1], 16) / 255,
                        parseInt(execResult[2], 16) / 255,
                        parseInt(execResult[3], 16) / 255,
                        parseInt(execResult[4], 16) / 255);
                }
            });
        } else {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult: any) {
                    return new Rgba(parseInt(execResult[1], 16) / 255,
                        parseInt(execResult[2], 16) / 255,
                        parseInt(execResult[3], 16) / 255,
                        1);
                }
            },
                {
                    re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                    parse: function (execResult: any) {
                        return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
                            parseInt(execResult[2] + execResult[2], 16) / 255,
                            parseInt(execResult[3] + execResult[3], 16) / 255,
                            1);
                    }
                });
        }

        colorString = colorString.toLowerCase();
        let hsva: Hsva | null = null;
        for (let key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                let parser = stringParsers[key];
                let match = parser.re.exec(colorString), color: any = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = color.toHsva();
                    } else if (color instanceof Hsla) {
                        hsva = color.toHsva();
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    }

    
    toString(outputFormat: string, allowHex8: boolean): string {
        if (this.a < 1) {
            switch (outputFormat) {
                case 'hsla':
                    let hsla = this.toHsla();
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' + hslaText.a + ')';
                default:
                    if (allowHex8 && outputFormat === 'hex')
                        return this.toRgba().denormalizeRGBA().toString(allowHex8);
                    let rgba = this.toRgba().denormalizeRGBA();
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        } else {
            switch (outputFormat) {
                case 'hsla':
                    let hsla = this.toHsla();
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgba':
                    let rgba = this.toRgba().denormalizeRGBA();
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.toRgba().denormalizeRGBA().toString(allowHex8);
            }
        }
    }
}

export class Hsla {
    constructor(public h: number, public s: number, public l: number, public a: number) { }

    toHsva(): Hsva {
        let h = Math.min(this.h, 1), s = Math.min(this.s, 1), l = Math.min(this.l, 1), a = Math.min(this.a, 1);
        if (l === 0) {
            return new Hsva(h, 0, 0, a);
        } else {
            let v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return new Hsva(h, 2 * (v - l) / v, v, a);
        }
    }
}

export class Rgba {
    constructor(public r: number, public g: number, public b: number, public a: number) { }

    toHsva(): Hsva {
        let r = Math.min(this.r, 1), g = Math.min(this.g, 1), b = Math.min(this.b, 1), a = Math.min(this.a, 1);
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h: number = 0;
        let s: number, v: number = max;

        let d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return new Hsva(h, s, v, a)
    }

    
    toString(allowHex8: boolean): string {
        let hexText = '#' + ((1 << 24) | (this.r << 16) | (this.g << 8) | this.b).toString(16).substr(1);
        if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6] && this.a === 1 && !allowHex8) {
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];
        }
        if (allowHex8) {
            hexText += ((1 << 8) | Math.round(this.a * 255)).toString(16).substr(1);
        }
        return hexText;
    }

    denormalizeRGBA(): Rgba {
        return new Rgba(Math.round(this.r * 255), Math.round(this.g * 255), Math.round(this.b * 255), this.a);
    }


}
export class SliderPosition {
    constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class SliderDimension {
    constructor(public h: number, public s: number, public v: number, public a: number) { }
}