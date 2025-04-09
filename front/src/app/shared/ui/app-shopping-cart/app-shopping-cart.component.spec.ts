import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShoppingCartComponent } from './app-shopping-cart.component';

describe('AppShoppingCartComponent', () => {
  let component: AppShoppingCartComponent;
  let fixture: ComponentFixture<AppShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShoppingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
