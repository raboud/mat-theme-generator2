import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';


import 'prismjs'
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';

declare var Prism: any;

@Component({
  selector: 'prism, [prism]',
  template: '<ng-content></ng-content>',
  styles: [`
    :host.dark {
      background: #333;
      color: #FFF;
      padding: 8px;
    }`
  ]
})
export class PrismComponent implements AfterViewInit {
  @Input() code: string = "";
  @Input() language = 'javascript';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    let code = (this.code || this.el.nativeElement.innerText)
    console.log(code);
 //   code = this.fixIndent(code);
    const grammar = Prism.languages[this.language];
    let html = Prism.highlight(code, grammar, this.language);
    html = html.replace(/(?:\r\n|\r|\n)/g, '<br>');

    console.log(html);
    this.el.nativeElement.innerHTML = html;
  }

  private fixIndent(code: string) {
    const removeThis = (code.match(/^([ ]+)/) || [])[1];
    if (removeThis) {
      const re = new RegExp(`^${removeThis}`, 'gm')
      return code.replace(re, '');
    }
    return code;
  }
}
