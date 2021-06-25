import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  @Input() searchText: string = "";
  @Output() searchTextChange = new EventEmitter<string>();

  constructor() {
  }

  /**
   * 
   * @param e 
   */
  onChange(e: any): void {
    this.searchText = e.target.value;
    this.searchTextChange.emit(this.searchText);
  }
}