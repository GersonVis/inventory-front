import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(private categoryService: CategoryService){

  }
  //metodo de carga
  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ["id", "name", "description", "actions"]
  dataSource = new MatTableDataSource<CategoryElement>();
  getCategories(){
    this.categoryService.getCategories()
    .subscribe((data: any)=>{
      //  console.log("recivido", data)
        this.processCategoriesResponse(data)
    }, (error: any)=>{
        console.error(error)
    })
  }
 
  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = []
    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category
      
      listCategory.forEach((element: CategoryElement) => {
            console.log(element)
            dataCategory.push(element)
            console.log("introdujo")
      });
      console.log("antes de introducir")
      this.dataSource=new MatTableDataSource<CategoryElement>(dataCategory)
      console.log("despues de introducir")
    }
   // console.log(this.dataSource)

  }

}
export interface CategoryElement{
      name: string;
      description: string;
      id: number;
}