import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const fakeProductsService = jasmine.createSpyObj<ProductsService>('ProductsService', ['create'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        MockSearchComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatBadgeModule,
        MatDialogModule,
        MatIconModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
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