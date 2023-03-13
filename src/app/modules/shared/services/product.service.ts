import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const base_url = environment.base_uri

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  /**
   * get all the products
   * @returns 
   */
  getProducts(){
    const endpoint = `${base_url}/products`
    return this.http.get(endpoint)
  }
  /**
   * create new product
   * @param body 
   * @returns 
   */
  saveProduct(body: any){
    const endPoint = `${base_url}/products`
    return this.http.post(endPoint, body)
  }
  /**
   * update product by id
   * @param body 
   * @param id 
   * @returns 
   */
  updateProduct(body: any, id: number){
    const endPoint = `${base_url}/products/${id}`
    return this.http.put(endPoint, body)
  }
/**
 * delete product by id
 * @param id 
 * @returns 
 */
  delete( id: number){
    const endPoint = `${base_url}/products/${id}`
    return this.http.delete(endPoint)
  }
}
