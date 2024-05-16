import { Component } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {
  categoryId: any = this.route.snapshot.params['categoryId'];
  validateForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  isSpinning: boolean = false;

  constructor(private route: ActivatedRoute,
    private service: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  submitForm(): void {
    this.isSpinning = true;
    const formData:FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('name', this.validateForm.get('name')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    this.service.addProduct(formData, this.categoryId).subscribe((data:any)=> {
      this.isSpinning = false;
      if(data.id != null){
        this.message.success("Product added successfully", {nzDuration: 5000});
        this.router.navigate(['/admin/dashboard']);
      } else{
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
