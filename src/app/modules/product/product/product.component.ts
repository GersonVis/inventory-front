import { NumberSymbol } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService,
    public dialog: MatDialog, private openSnackBar: MatSnackBar){

  }



  ngOnInit(): void {
      this.getProducts()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ["id", "name", "price", "account", "category","picture", "actions"]

  dataSource = new MatTableDataSource<ProductElement>();

  getProducts(){
        this.productService.getProducts()
        .subscribe((data:any)=>{
          console.log("api: ", data)
          this.processProductResponse(data)
        }, (error:any)=>{
          console.error(error)
        })
  }

  processProductResponse(resp: any){
    const dataProduct: ProductElement[] = []
    if(resp.metadata[0].code == "00"){
      let listCProduct = resp.product.products
      listCProduct.forEach((element: ProductElement)=>{
          //  element.category = element.category.name
            element.picture = 'data:image/jpeg;base64,'+element.picture
            dataProduct.push(element)
      })
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct)
      this.dataSource.paginator = this.paginator
    }
  }
  buscar(name: any){
    if(name.length===0){
      return this.getProducts()
    }
    this.productService.getProductsByName(name)
    .subscribe((data: any)=>{
      this.processProductResponse(data)
    })

  }
  delete(id: number){
    const dialogRef = this.dialog.open(ConfirmComponent,{
      
      data: {id: id, module: "product"}
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result == 1){
        this.message("Producto eliminado", "Exitosa", 2000)
        this.getProducts()
      }else if(result ==2){
        this.message("Se produjo un error al eliminar el producto", "Error", 2000)
      }
    })
  }
  edit(id: number,
    name: string,
    price: number, 
    account: number,
    category: any){
      const dialogRef = this.dialog.open(NewProductComponent,{
        width: "400px",
        data:{
          id: id, account:account, price:price, name:name, category: category
        }
      })
      dialogRef.afterClosed()
      .subscribe((res:any)=>{
          if(res==1){
            this.getProducts()
            this.message("Producto editado", "Exitosa", 2000)
          }else if(res==2){
            this.message("Producto editado", "Exitosa", 2000)
          }
      },)
  }
  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent,{
      width: "400px"
    })
    dialogRef.afterClosed()
    .subscribe((res:any)=>{
        if(res==1){
          this.getProducts()
          this.message("Categoría agregada", "Exitosa", 2000)
        }else if(res==2){
          this.message("No se ha podido crear", "Exitosa", 2000)
        }
    },)
  }
   message(title: string, msg: string, duration:number){
        this.openSnackBar.open(title, msg,{
          duration: duration
        })
   }

}
export interface ProductElement {
  id: number,
  name: string,
  price: number,
  account: number,
  category: any,
  picture: any
}