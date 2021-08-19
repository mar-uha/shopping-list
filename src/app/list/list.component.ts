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

  filterText = "";
  filterTextChange: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.list();
    this.allProducts = this.products;
    this.productsService.setProductsToBuy(this.products.filter(p => p.isSelected));
  }

  filterList(value: string): void {
    if (!value) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
    }
    this.filterText = value;
  }

  /**
   * Open a dialog box to create a new product in the store.
   */
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

  /**
   * Rename a product in the store.
   * @param oldProductName Product name to rename.
   */
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

  /**
   * Adding to the store a missing product.
   */
  addMissingProduct(): void {
    this.products = this.productsService.create({
        name: this.filterText,
        count: 0,
        isSelected: false
      } as Product);
    this.filterText = "";
  }

  /**
   * Add 1 unit of this product.
   * @param productName Product name to add 1 unit.
   */
  addProductToBuy(productName: string): void {
    let product = this.products.find(p => p.name === productName);
    if (product) {
      product.count += 1;
      if (product.count == 1) {
        product.isSelected = true;
        this.productsService.setProductsToBuy(this.products.filter(p => p.isSelected));
      }
    }

    this.productsService.save(this.products);
  }

  /**
   * Remove 1 unit of this product.
   * @param productName Product name to remove 1 unit.
   */
  removeProductToBuy(productName: string): void {
    let product = this.products.find(p => p.name === productName);
    if (product) {
      product.count -= 1;
      if (product.count == 0) {
        product.isSelected = false;
        this.productsService.setProductsToBuy(this.products.filter(p => p.isSelected));
      }
    }

    this.productsService.save(this.products);
  }

  /**
   * Delete product from the store.
   * @param productName Product name to delete.
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
