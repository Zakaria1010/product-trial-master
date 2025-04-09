import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { AppShoppingCartComponent } from "./shared/ui/app-shopping-cart/app-shopping-cart.component";
import { DialogModule } from 'primeng/dialog';
import { CartService } from "./products/data-access/cart.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule, SplitterModule, 
    ToolbarModule, PanelMenuComponent, 
    AppShoppingCartComponent, 
    DialogModule, CommonModule],
})
export class AppComponent {
  title = "ALTEN SHOP";

  cartVisible = false; // Toggle visibility of the cart modal
  cart: any[] = []; // Array to hold cart items

  cartQuantity = 0; // Quantité d'articles dans le panier

  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    // Subscribe to the cart observable to get the cart items
    this.cartService.cart$.subscribe(cartItems => {
      this.cart = cartItems; // Update the cart data when it changes
      this.cartQuantity = this.cartService.getCartQuantity();
    });
  }

  public toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  // Function to remove product from the cart
  public onRemoveFromCart(product: any) {
    this.cartService.removeFromCart(product); // Call service to remove item
  }
}
