import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { ProductComponent } from '../product/product.component';



export interface CategoryElement {
  name: string;
  description: string;
  id: number;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit {
  public productForm: FormGroup;
  public actionType: string = ""
  public categories: CategoryElement[] = []
  selectedFile: any
  nameImg: string = ""

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],

    })
    if (data != null) {
      this.updateForm(data)
    }


  }
  ngOnInit(): void {
    this.getCategories()
  }
  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: [, Validators.required],
    })
  }

  onSave() {
    let data = {
      name: this.productForm.get("number")?.value,
      price: this.productForm.get("price")?.value,
      account: this.productForm.get("account")?.value,
      category: this.productForm.get("category")?.value,
      picture: this.selectedFile
    }
    const uploadImageData = new FormData()
    uploadImageData.append("picture", data.picture, data.picture.name)
    uploadImageData.append("name", data.name)
    uploadImageData.append("price", data.price)
    uploadImageData.append("account", data.account)
    uploadImageData.append("categoryId", data.category)

    if (this.data != null) {
      this.productService.updateProduct(uploadImageData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
          console.error("Error: ", error)
        })
    } else {
      this.productService.saveProduct(uploadImageData)
        .subscribe((data: any) => {
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
          console.error("Error: ", error)
        })
    }



  }
 
  onCancel() {
    this.dialogRef.close()
  }
  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        this.categories = data.categoryResponse.category
      }, (error: any) => {
        console.error("Error: ", error)
      })
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
    this.nameImg = event.target.files[0].name
  }
}

