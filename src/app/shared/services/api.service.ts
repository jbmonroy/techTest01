import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly URL = 'https://fakestoreapi.com';
  private http = inject(HttpClient);
  constructor() { }

  /**
   * Make a login and get a Token
   * @param credentials JSON with user credentials
   * @returns Observable to await a response
   */
  login(credentials: { user: String, password: String }): Observable<any> {
    return this.http.post(`${this.URL}/auth/login`, credentials);
  }
  /**
   * Deletes the user_token and navigate to /auth.
   * @param router Ijection of Router.
   */
  logout(router: Router): void {
    localStorage.removeItem('user_token');
    router.navigate(['/']);
  }
  /**
   * Add a new Product to the collection
   * @param body 
   * @returns Observable to await a response
   */
  addNewProduct(body: {
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
  }): Observable<any> {
    return this.http.post(`${this.URL}/products`, body);
  }
  /**
   * Give all the product's collection
   * @returns Observable to await a response
   */
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.URL}/products`)
  }

  getProduct(id:number): Observable<any> {
    return this.http.get(`${this.URL}/products/${id}`);
  }
  /**
   * Updates a element
   * @param id Element id
   * @param body New body
   * @returns Observable to await a response
   */
  updateProduct(id: number, body: {
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
  }): Observable<any> {
    return this.http.put(`${this.URL}/products/${id}`, body);
  }
  /**
   * Removes a Element of the collection.
   * @param id ElementId
   * @returns bservable to await a response
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/products/${id}`);
  }




}
