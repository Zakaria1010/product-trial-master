import { CommonModule, CurrencyPipe } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CartService } from "app/products/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { AppShoppingCartComponent } from "app/shared/ui/app-shopping-cart/app-shopping-cart.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule, CardModule, 
    ButtonModule, DialogModule, 
    ProductFormComponent, CurrencyPipe, 
    FormsModule, InputTextModule,
    CommonModule
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  public isDialogVisible = false;
  public isCreation = false;
  public cart: any[] = [];
  public readonly editedProduct = signal<Product>(emptyProduct);

  products: Product[] = [];
  totalProducts: number = 0;
  page: number = 1;
  pageSize: number = 6;
  filter: string = '';

  ngOnInit() {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.productsService.get(this.page, this.pageSize, this.filter).subscribe(data => {
      this.products = data;
      // If needed, you can calculate total products here based on your filter.
      this.totalProducts = this.products.length;
    });
  }

  public onPageChange(event: any): void {
    this.page = event.page + 1; // PrimeNG paginator uses 0-based index
    this.loadProducts();
  }

  public onFilterChange(): void {
    this.page = 1;  // Reset to page 1 when filter changes
    this.loadProducts();
  }

  public trackProduct(index: number, product: Product): number {
    return product.id;
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onAddToCart(product: any) {
    this.cartService.addToCart(product);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
