import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-owner-icon',
  templateUrl: './owner-icon.component.html',
  styleUrls: ['./owner-icon.component.scss']
})
export class OwnerIconComponent {
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
