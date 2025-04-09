import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { AuthComponent } from "./shared/auth/auth.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.routes").then((m) => m.CONTACT_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { 
    path: 'auth', 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthComponent, data: { mode: 'login' } },
      { path: 'register', component: AuthComponent, data: { mode: 'register' } }
    ]
  }
];
