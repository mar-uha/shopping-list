import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  products: Product[] = [
    {
      name: 'Banane'
    },
    {
      name: 'Tomates'
    },
    {
      name: 'Concombres'
    },
    {
      name: 'Fêta'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
