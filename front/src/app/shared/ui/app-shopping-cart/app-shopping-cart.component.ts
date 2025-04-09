import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './app-shopping-cart.component.html',
  styleUrl: './app-shopping-cart.component.css'
})
export class AppShoppingCartComponent {
  @Input() cartItems: any[] = [];
  @Output() remove = new EventEmitter<any>();

  removeFromCart(item: any) {
    this.remove.emit(item);
  }

  calculateTotal() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    console.log('Proceeding to checkout');
    // Add your checkout logic here
  }
}
