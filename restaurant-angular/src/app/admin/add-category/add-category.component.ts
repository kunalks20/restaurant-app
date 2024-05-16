import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { AdminService } from '../admin-service/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  categoryForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private message:NzMessageService
  ){ }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name:['', Validators.required],
      description:['', Validators.required]
    });
  }

  postCategory() {
    console.log(this.categoryForm.value);
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('name', this.categoryForm.get('name')?.value);
    formData.append('description', this.categoryForm.get('description')?.value);
    this.service.postCategory(formData).subscribe(data => {
      console.log(data);
      if (data.name != null) {
        this.message.success("Category added successfully", {nzDuration: 5000});
      } else if (data.name == null) {
        this.message.error("Something went wrong", {nzDuration: 5000});
      }
    })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  
}
