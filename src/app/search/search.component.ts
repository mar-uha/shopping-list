import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  @Output() searchText = new EventEmitter<string>();

  constructor() {
  }

  /**
   * 
   * @param e 
   */
  onChange(e: any): void {
    const value = e.target.value;
    this.searchText.emit(value);
  }
}