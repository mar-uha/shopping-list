import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { DialogData } from '../models/dialog-data';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  productSelectedCount:number = 0;
  allProducts: Product[] = [];
  products: Product[] = [];
  selectedOptions: String[] = [];
  
  constructor(public dialog: MatDialog,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.list();
    this.allProducts = this.products;
    this.productsService.productsToBuy.subscribe(products => 
      this.selectedOptions = products.map(p => p.name)
    );
  }

  filterList(value: string): void {
    if (!value) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '250px',
      data: { productName: '' } as DialogData
    });

    dialogRef.afterClosed().subscribe((productName: string) => {
      if (productName) {
        this.products = this.productsService.create({ name: productName } as Product);
      }
    });
  }

  onNgModelChange(e: any): void {
    const productsToBuy = this.allProducts.filter(p => this.selectedOptions.find(s => s === p.name) !== undefined );
    this.productsService.setProductsToBuy(productsToBuy);
  }
}
