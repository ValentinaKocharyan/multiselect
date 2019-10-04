import {Directive, HostListener, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  constructor(private elRef: ElementRef) {}
  @Output()
  public appOutsideClick = new EventEmitter();

  private targetElement = this.elRef.nativeElement;

  @HostListener('window:click', ['$event.target'])
  public onClick(clickedElement) {
    const clickedInside = this.targetElement.contains(clickedElement);
    if (!clickedInside) {
      this.appOutsideClick.emit(null);
    }
  }
}
