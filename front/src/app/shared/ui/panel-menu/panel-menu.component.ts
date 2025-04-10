import {
    Component,
  } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { MenuItem } from "primeng/api";
  import { PanelMenuModule } from 'primeng/panelmenu';
import { BehaviorSubject } from "rxjs";
  
  @Component({
    selector: "app-panel-menu",
    standalone: true,
    imports: [PanelMenuModule],
    template: `
        <p-panelMenu [model]="isAuthenticated ? allItems : homeItem" styleClass="w-full" />
    `
  })
  export class PanelMenuComponent {
    // BehaviorSubject to track authentication state
    private tokenSubject = new BehaviorSubject<boolean>(this.checkToken());
    isAuthenticated = this.tokenSubject.asObservable(); // Expose it as observable

    public readonly allItems: MenuItem[] = [
        {
            label: 'Accueil',
            icon: 'pi pi-home',
            routerLink: ['/home']
        },
        {
            label: 'Produits',
            icon: 'pi pi-barcode',
            routerLink: ['/products/list']
        },
        {
            label: 'Contact',
            icon: 'pi pi-id-card',
            routerLink: ['/contact']
        }
    ]
    public readonly homeItem: MenuItem[] = [          {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/home']
    }]

    /**
     *
     */
    constructor() {
      window.addEventListener('storage', this.handleStorageChange.bind(this));
    }

    private checkToken(): boolean {
      const token = localStorage.getItem('token');
      if (!token) return false;
      try {
        const decoded: any = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // Token not expired
      } catch {
        return false;
      }
    }

      // This will be called when the storage (localStorage) changes
    private handleStorageChange(event: StorageEvent): void {
      if (event.key === 'token') {
        // Update the authentication status whenever the token changes
        this.tokenSubject.next(this.checkToken());
      }
    }
  }
  