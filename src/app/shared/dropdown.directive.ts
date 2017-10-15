import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false; // Binds to the 'open' class of the  host element

  @HostListener('click') toggleOpen() { // Listens for a click event on the host element
    this.isOpen = !this.isOpen;
  }
}
