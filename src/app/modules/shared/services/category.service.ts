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
}
