import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @Output() onLookingFor = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * 
   * @param e 
   */
  onChange(e: any): void {
    const value = e.target.value;
    this.onLookingFor.emit(value);
  }
}