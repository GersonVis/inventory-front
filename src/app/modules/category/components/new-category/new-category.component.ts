import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  public categoryForms: FormGroup;
  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>
    ){
    this.categoryForms = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSave(){
    let data={
      name: this.categoryForms.get("name")?.value,
      description: this.categoryForms.get("description")?.value
    }
    this.categoryService.saveCategorie(data).subscribe(res=>{
        console.log(res)
        this.dialogRef.close(1)
    }, ((error:any)=>{
      console.error("Error", error)
        this.dialogRef.close(2)
    }))
    
  }
  onCancel(){
    this.dialogRef.close(3)
  }


}
