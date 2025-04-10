import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { AuthComponent } from "./shared/auth/auth.component";
import { authGuard } from "./guards/auth.guard";
import { StoreWelcomeComponent } from "./shared/ui/store-welcome/store-welcome.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "welcome",
    component: StoreWelcomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.routes").then((m) => m.CONTACT_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }, {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthComponent, data: { mode: 'login' } },
      { path: 'register', component: AuthComponent, data: { mode: 'register' } }
    ]
  }
];
