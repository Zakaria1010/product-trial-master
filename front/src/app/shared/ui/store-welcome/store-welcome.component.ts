import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-store-welcome',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './store-welcome.component.html',
  styleUrl: './store-welcome.component.css'
})
export class StoreWelcomeComponent {
  public readonly appTitle = "ALTEN SHOP";
  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
