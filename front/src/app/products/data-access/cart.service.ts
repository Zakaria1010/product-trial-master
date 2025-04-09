import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]); // Observable to hold cart items
  cart$ = this.cartSubject.asObservable(); // Expose the cart as an observable
  constructor() { }

  public addToCart(product: any) {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, product]);
  }

    // Remove product from the cart
  public removeFromCart(product: any) {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next(currentCart.filter(item => item !== product));
  }

  public getCartQuantity(): number {
    return this.cartSubject.value.length;
  }

  // Get current cart items
  public getCartItems() {
    return this.cartSubject.value;
  }
}
