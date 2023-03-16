import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { UtilService } from 'src/app/modules/shared/services/util.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({ 
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  isAdmin: any
  constructor(private categoryService: CategoryService,
    public dialog: MatDialog, private snackBar: MatSnackBar,
    private util: UtilService
    ){

  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  //metodo de carga
  ngOnInit(): void {
    this.getCategories();
    this.isAdmin=this.util.isAdmin()

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
      this.dataSource=new MatTableDataSource<CategoryElement>(dataCategory)
      this.dataSource.paginator
    }
   // console.log(this.dataSource)

  }
  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent,{
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result == 1){
        this.openSnackBar("Categoría agregada", "Exitosa")
        this.getCategories()
      }else if(result ==2){
        this.openSnackBar("Se produjo un error al guardar la categoría", "Error")
      }
    })
  }
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
      return this.snackBar.open(message, action, {
        duration: 2000
      })
  }
  edit(id:number, name:string, description: string){
    const dialogRef = this.dialog.open(NewCategoryComponent,{
      width: '450px',
      data: {id: id, name: name, description: description}
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result == 1){
        this.openSnackBar("Categoría agregada", "Exitosa")
        this.getCategories()
      }else if(result ==2){
        this.openSnackBar("Se produjo un error al guardar la categoría", "Error")
      }
    })
  }

  delete(id:number){
    const dialogRef = this.dialog.open(ConfirmComponent,{
      
      data: {id: id, module: "category"}
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result == 1){
        this.openSnackBar("Categoría eliminada", "Exitosa")
        this.getCategories()
      }else if(result ==2){
        this.openSnackBar("Se produjo un error al eliminar la categoría", "Error")
      }
    })
  }
  buscar(termino: string){
     if(termino.length===0){
      this.getCategories()
     }
     this.categoryService.getCategoriesById(termino).subscribe((resp:any)=>{
      console.log("category: ", resp)
      this.processCategoriesResponse(resp)
     })
  }

}
export interface CategoryElement{
      name: string;
      description: string;
      id: number;
}