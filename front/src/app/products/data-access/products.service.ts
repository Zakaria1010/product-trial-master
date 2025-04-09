import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    
    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    public get(
        page: number = 1, 
        pageSize: number = 6, 
        filter: string = ''
    ): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json");
            }),
            tap((products) => this._products.set(products)),
            // After fetching products, apply pagination and filtering
            tap(() => this._applyFilterAndPagination(page, pageSize, filter))
        );
    }

    private _applyFilterAndPagination(
        page: number, 
        pageSize: number, 
        filter: string
    ): void {
        let filteredProducts = [...this._products()];
        
        // Filter products
        if (filter) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(filter.toLowerCase()) ||
                product.category.toLowerCase().includes(filter.toLowerCase())
            );
        }
        
        // Paginate products
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        this._products.set(paginatedProducts);
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}