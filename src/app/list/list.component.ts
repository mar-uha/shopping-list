import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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

  productSelectedCount: number = 0;

  /**
   * All products in the store.
   */
  allProducts: Product[] = [];
  products: Product[] = [];
  selectedOptions: String[] = [];

  filterText = "";
  filterTextChange: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.list();
    this.allProducts = this.products;

    this.productsService.productsToBuy.subscribe(products => {
      this.selectedOptions = products.map(p => p.name);
    });
  }

  filterList(value: string): void {
    if (!value) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
    }
    this.filterText = value;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '250px',
      data: { productName: '' } as DialogData
    });

    dialogRef.afterClosed().subscribe((productName: string) => {
      if (productName) {
        this.products = this.productsService.create({
          name: this.filterText,
          count: 0,
          isSelected: false
        } as Product);
      }
    });
  }

  renameProduct(oldProductName: string): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '250px',
      data: { productName: oldProductName } as DialogData
    });

    dialogRef.afterClosed().subscribe((productName: string) => {
      if (productName) {
        this.products = this.productsService.rename(oldProductName, productName);
      }
    });
  }

  onNgModelChange(e: any): void {
    const productsToBuy = this.allProducts.filter(p => this.selectedOptions.find(s => s === p.name) !== undefined);
    this.productsService.setProductsToBuy(productsToBuy);
  }

  addMissingProduct(): void {
    this.products = this.productsService.create({
        name: this.filterText,
        count: 0,
        isSelected: false
      } as Product);
    this.filterText = "";
  }

  /**
   * 
   * @param productName 
   */
  addProductToBuy(productName: string): void {
    let product = this.products.find(p => p.name === productName);
    if (product) {
      product.count += 1;
      if (product.count == 1) {
        product.isSelected = true;
      }
    }

    this.productsService.save(this.products);
  }

  removeProductToBuy(productName: string): void {
    let product = this.products.find(p => p.name === productName);
    if (product) {
      product.count -= 1;
      if (product.count == 0) {
        product.isSelected = false;
      }
    }

    this.productsService.save(this.products);
  }

  /**
   * 
   * @param productName 
   */
  deleteProduct(productName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: productName
    });

    dialogRef.afterClosed().subscribe((productName: string) => {
      if (productName) {
        this.products = this.productsService.delete(productName);
      }
    });
  }
}
