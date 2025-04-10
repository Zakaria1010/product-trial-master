import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { StoreWelcomeComponent } from "../../ui/store-welcome/store-welcome.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, StoreWelcomeComponent],
})
export class HomeComponent {
  public readonly appTitle = "ALTEN SHOP";
  isAuthenticated = false; 
  
  constructor(private router: Router) {}
  ngOnInit() {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  navigateToLogin() {
    this.router.navigate(['/auth', { mode: 'login' }]);
  }

  navigateToRegister() {
    this.router.navigate(['/auth', { mode: 'register' }]);
  }
}
