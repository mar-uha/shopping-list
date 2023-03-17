import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const fakeProductsService = jasmine.createSpyObj<ProductsService>('ProductsService', ['create', 'delete', 'list', 'save', 'setProductsToBuy']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        MockSearchComponent
      ],
      providers: [
        { provide: ProductsService, useValue: fakeProductsService }
      ],
      imports: [
        BrowserAnimationsModule,
        MatBadgeModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fakeProductsService.list.and.returnValue([] as Array<Product>);
    
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should add a missing product`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.filterText = 'Sausage';

    fakeProductsService.create.and.returnValue([{
      name: listComponent.filterText,
      count: 0,
      isSelected: false
    }] as Array<Product>);
    
    listComponent.addMissingProduct();

    expect(listComponent.products.length).withContext('The `addMissingProduct` method should add 1 Product').toBe(1);
    expect(listComponent.filterText).toEqual('');
  });

  it(`should add 1 quantity of product to the shopping list`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.products = [
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>;

    fakeProductsService.setProductsToBuy.and.callFake(() => null);
    fakeProductsService.save.and.returnValue([
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 7
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>);
    
    listComponent.addProductToBuy('Eggs');

    expect(listComponent.products.find(p => p.name === 'Eggs')).not.toBeNull();
    expect(listComponent.products.find(p => p.name === 'Eggs')?.count).toEqual(7);
    expect(listComponent.products.find(p => p.name === 'Eggs')?.isSelected).toBeTrue();
  });

  it(`should add 1 quantity of product and add product to the shopping list`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.products = [
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>;

    fakeProductsService.setProductsToBuy.and.callFake(() => null);
    fakeProductsService.save.and.returnValue([
      {
        name: 'Carrot',
        isSelected: true,
        count: 1
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: false,
        count: 0
      }] as Array<Product>);
    
    listComponent.addProductToBuy('Carrot');

    expect(listComponent.products.find(p => p.name === 'Carrot')).not.toBeNull();
    expect(listComponent.products.find(p => p.name === 'Carrot')?.count).toEqual(1);
    expect(listComponent.products.find(p => p.name === 'Carrot')?.isSelected).toBeTrue();
  });

  it(`should remove 1 quantity of product to the shopping list`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.products = [
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>;

    fakeProductsService.setProductsToBuy.and.callFake(() => null);
    fakeProductsService.save.and.returnValue([
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 5
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>);
    
    listComponent.removeProductToBuy('Eggs');

    expect(listComponent.products.find(p => p.name === 'Eggs')).not.toBeNull();
    expect(listComponent.products.find(p => p.name === 'Eggs')?.count).toEqual(5);
    expect(listComponent.products.find(p => p.name === 'Eggs')?.isSelected).toBeTrue();
  });

  it(`should remove 1 quantity of product and remove product from the shopping list`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.products = [
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>;

    fakeProductsService.setProductsToBuy.and.callFake(() => null);
    fakeProductsService.save.and.returnValue([
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: false,
        count: 0
      }] as Array<Product>);
    
    listComponent.removeProductToBuy('Mustard');

    expect(listComponent.products.find(p => p.name === 'Mustard')).not.toBeNull();
    expect(listComponent.products.find(p => p.name === 'Mustard')?.count).toEqual(0);
    expect(listComponent.products.find(p => p.name === 'Mustard')?.isSelected).toBeFalse();
  });

  it(`should filter the list of products`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.products = [
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>;
    listComponent.allProducts = [
        {
          name: 'Carrot',
          isSelected: false,
          count: 0
        },
        {
          name: 'Eggs',
          isSelected: true,
          count: 6
        },
        {
          name: 'Mustard',
          isSelected: true,
          count: 1
        }] as Array<Product>;


    listComponent.filterList('Must');

    expect(listComponent.products.length).withContext('You should have one product named "Mustard"').toBe(1);
    expect(listComponent.products.find(p => p.name === 'Mustard')).not.toBeNull();
  });

  it(`should diplay all products`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const listComponent = fixture.componentInstance;
    listComponent.products = [
      {
        name: 'Carrot',
        isSelected: false,
        count: 0
      },
      {
        name: 'Eggs',
        isSelected: true,
        count: 6
      },
      {
        name: 'Mustard',
        isSelected: true,
        count: 1
      }] as Array<Product>;
    listComponent.allProducts = [
        {
          name: 'Carrot',
          isSelected: false,
          count: 0
        },
        {
          name: 'Eggs',
          isSelected: true,
          count: 6
        },
        {
          name: 'Mustard',
          isSelected: true,
          count: 1
        }] as Array<Product>;


    listComponent.filterList('');

    expect(listComponent.products.length).withContext('You should have three products"').toBe(3);
  });

  // it(`should have as title 'shopping-list'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('shopping-list');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('shopping-list app is running!');
  // });
});

@Component({
  selector: 'app-search',
  template: ''
})
class MockSearchComponent {
  @Input() searchText: string = '';
}