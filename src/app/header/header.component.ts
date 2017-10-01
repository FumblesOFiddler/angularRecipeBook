import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() onSelectHeader = new EventEmitter<string>();

  onSelect(selectedHeading: string) {
    this.onSelectHeader.emit(selectedHeading);
  }
}
