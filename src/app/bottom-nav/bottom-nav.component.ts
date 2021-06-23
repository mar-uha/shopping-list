import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.sass']
})
export class BottomNavComponent implements OnInit {

  @Input() productToBuyCount = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
