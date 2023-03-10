import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';


const base_uri = environment.base_uri
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * get all categories
   * @returns json
   */
  getCategories(){
      const endpoint = `${base_uri}/categories`;
      return this.http.get(endpoint)
  }
  /**
   * save categories
   * @param body 
   * @returns 
   */
  saveCategorie(body: any){
    const endPoint = `${base_uri}/categories`
    return this.http.post(endPoint, body)
  }

  /**
   * new information update
   * @param body 
   * @param id 
   * @returns 
   */
  updateCategories(body: any, id: any){
    const endPoint = `${base_uri}/categories/${id}`
    return this.http.put(endPoint, body)
  }

  deleteCategories(id: any){
    const endPoint = `${base_uri}/categories/${id}`
    return this.http.delete(endPoint)
  }

  getCategoriesById(id: any){
    const endPoint = `${base_uri}/categories/${id}`
    return this.http.get(endPoint, {})
  }

 
}
