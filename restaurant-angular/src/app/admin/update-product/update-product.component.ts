import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [DemoNgZorroAntdModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  productId: number = this.activatedRoute.snapshot.params['productId'];
  isSpinning: boolean = false;
  validateForm!: FormGroup;
  imgChanged: boolean = false;
  selectedFile:any;
  imagePreview!: string | ArrayBuffer | null;
  existingImage!: string | null;


  constructor(private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name:['', Validators.required],
      description:['', Validators.required],
      price:['', Validators.required]
    });
    this.getProductById();
  }

  getProductById() {
    this.isSpinning = true;
    this.adminService.getProductById(this.productId).subscribe(
      (data:any) => {
        this.isSpinning = false;
        this.validateForm.patchValue(data);
        this.existingImage = 'data:image/jpeg;base64,'+ data.returnedImg
    }, (error:any) => {
        this.isSpinning = false;
        this.message.error("Something went wrong", {nzDuration: 5000})
    });
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  updateProduct(){
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append('img', this.selectedFile);
    }
    formData.append('name', this.validateForm.value.name);
    formData.append('description', this.validateForm.value.description);
    formData.append('price', this.validateForm.value.price);
    console.log(formData);
    this.adminService.updateProductDetails(formData, this.productId).subscribe({
      next: (data) => {
        this.isSpinning = false;
        if(data.id != null){
          this.message.success("Product updated successfully", {nzDuration: 5000});
          this.router.navigate(['/admin/dashboard']);
        }
        else{
          this.message.error("Something went wrong", {nzDuration: 5000});
        }
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Something went wrong", {nzDuration: 5000});
      }
    })
    
  }
}
