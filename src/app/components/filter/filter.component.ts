import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() continentChanged = new EventEmitter<string>();

  continents: string[] = [
    'Africa', 'Asia', 'Europe', 'North America', 'Sur America'
  ];

  onContinentSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.continentChanged.emit(selectElement.value);
  }
}
