import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, ButtonModule],
})
export class HomeComponent {
  public readonly appTitle = "ALTEN SHOP";

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/auth', { mode: 'login' }]);
  }

  navigateToRegister() {
    this.router.navigate(['/auth', { mode: 'register' }]);
  }
}
