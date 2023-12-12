import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {


  @HostBinding('style.background') color: any;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.color = '#d3d3d3';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.color = ''; // Remettre la couleur à vide lorsque la souris quitte la ligne
  }
 
}