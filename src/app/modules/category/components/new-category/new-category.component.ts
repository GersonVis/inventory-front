import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForms: FormGroup;
  public actionType: string = ""
  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.actionType="Crear una nueva categoría"
    this.categoryForms = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    //if there aren/t data we used the data recived
    if (data != null) {
      this.actionType="Actualizar la categoría "+data.name
      this.updateForm(data)
    } 
  }
  updateForm(data: any) {
    this.categoryForms = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSave() {
    let data = {
      name: this.categoryForms.get("name")?.value,
      description: this.categoryForms.get("description")?.value
    }
    if (this.data != null) {
      this.categoryService.updateCategories(data, this.data.id).subscribe(res => {
        console.log(res)
        this.dialogRef.close(1)
      }, ((error: any) => {
        console.error("Error", error)
        this.dialogRef.close(2)
      }))
    } else {
      this.categoryService.saveCategorie(data).subscribe(res => {
        console.log(res)
        this.dialogRef.close(1)
      }, ((error: any) => {
        console.error("Error", error)
        this.dialogRef.close(2)
      }))
    }

  }
  onCancel() {
    this.dialogRef.close(3)
  }


}
