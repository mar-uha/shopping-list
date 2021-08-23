import { TestBed } from '@angular/core/testing';
import { Product } from './models/product';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    productsService = TestBed.inject(ProductsService);
    let store = {} as any;
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });

  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  it('should return an Array of 3 products', () => {
    let actualProducts: Array<Product> = [];

    const hardcodedProducts = [
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

    localStorage.setItem('allProducts', JSON.stringify(hardcodedProducts));
    actualProducts = productsService.list();

    expect(actualProducts.length).withContext('The `list` method should return an array of Product').not.toBe(0);
    expect(actualProducts.length).withContext('The `list` method should return an array of 3 Products').toBe(3);
    expect(actualProducts).toEqual(hardcodedProducts);
  });

  it('should create a product', () => {
    let actualProducts: Array<Product> = [];

    const actualProduct ={
        name: 'Carrot',
        isSelected: false,
        count: 0
      } as Product;

    actualProducts = productsService.create(actualProduct);

    expect(actualProducts.length).withContext('The `create` method should return an array of Product').not.toBe(0);
    expect(actualProducts.length).withContext('The `create` method should return an array of 1 Product').toBe(1);
    expect(actualProducts[0].name).toEqual('Carrot');
    expect(actualProducts[0].isSelected).toEqual(false);
    expect(actualProducts[0].count).toEqual(0);

    const localStorageValue = localStorage.getItem('allProducts');
    expect(localStorageValue).not.toBeNull();
    expect(localStorageValue?.length).not.toEqual(0);
    if (localStorageValue) {
      const productsInLocalStorage = JSON.parse(localStorageValue) as Array<Product>;
      expect(productsInLocalStorage[0].name).toEqual('Carrot');
      expect(productsInLocalStorage[0].isSelected).toEqual(false);
      expect(productsInLocalStorage[0].count).toEqual(0);
    }
  });

  it('should delete a product', () => {
    let actualProducts: Array<Product> = [];

    const hardcodedProducts = [
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

    localStorage.setItem('allProducts', JSON.stringify(hardcodedProducts));

    actualProducts = productsService.delete('Carrot');

    expect(actualProducts.length).withContext('The `create` method should return an array of Product').not.toBe(0);
    expect(actualProducts.length).withContext('The `create` method should return an array of 2 Products').toBe(2);
    expect(actualProducts[0].name).toEqual('Eggs');
    expect(actualProducts[0].isSelected).toEqual(true);
    expect(actualProducts[0].count).toEqual(6);

    const localStorageValue = localStorage.getItem('allProducts');
    expect(localStorageValue).not.toBeNull();
    expect(localStorageValue?.length).not.toEqual(0);
    if (localStorageValue) {
      const productsInLocalStorage = JSON.parse(localStorageValue) as Array<Product>;
      expect(productsInLocalStorage.filter(p => p.name === 'Carrot').length).toBe(0);
    }
  });

  it('should rename a product', () => {
    let actualProducts: Array<Product> = [];

    const hardcodedProducts = [
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

    localStorage.setItem('allProducts', JSON.stringify(hardcodedProducts));

    actualProducts = productsService.rename('Carrot', 'Burger');

    expect(actualProducts.length).withContext('The `create` method should return an array of Product').not.toBe(0);
    expect(actualProducts.length).withContext('The `create` method should return an array of 3 Products').toBe(3);
    expect(actualProducts[0].name).toEqual('Burger');
    expect(actualProducts[0].isSelected).toEqual(false);
    expect(actualProducts[0].count).toEqual(0);

    const localStorageValue = localStorage.getItem('allProducts');
    expect(localStorageValue).not.toBeNull();
    expect(localStorageValue?.length).not.toEqual(0);
    if (localStorageValue) {
      const productsInLocalStorage = JSON.parse(localStorageValue) as Array<Product>;
      expect(productsInLocalStorage[0].name).toEqual('Burger');
      expect(productsInLocalStorage[0].isSelected).toEqual(false);
      expect(productsInLocalStorage[0].count).toEqual(0);
    }
  });

  it('should save a product', () => {
    let actualProducts: Array<Product> = [];

    const hardcodedProducts = [
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

    actualProducts = productsService.save(hardcodedProducts);

    expect(actualProducts.length).withContext('The `create` method should return an array of Product').not.toBe(0);
    expect(actualProducts.length).withContext('The `create` method should return an array of 3 Products').toBe(3);
    expect(actualProducts[0].name).toEqual('Carrot');
    expect(actualProducts[0].isSelected).toEqual(false);
    expect(actualProducts[0].count).toEqual(0);

    const localStorageValue = localStorage.getItem('allProducts');
    expect(localStorageValue).not.toBeNull();
    expect(localStorageValue?.length).not.toEqual(0);
    if (localStorageValue) {
      const productsInLocalStorage = JSON.parse(localStorageValue) as Array<Product>;
      expect(productsInLocalStorage[0].name).toEqual('Carrot');
      expect(productsInLocalStorage[0].isSelected).toEqual(false);
      expect(productsInLocalStorage[0].count).toEqual(0);
    }
  });
  
});
