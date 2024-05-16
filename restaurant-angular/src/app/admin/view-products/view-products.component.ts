import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../admin-service/admin.service';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule, RouterModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductsComponent {
  categoryId: any  = this.activatedRoute.snapshot.params['categoryId'];
  products: any[] = [];
  filteredProducts: any[] = [];
  isSpinning: boolean = false;
  size: NzButtonSize = 'large';

  constructor(private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
  private message: NzMessageService) { }

  ngOnInit(): void {
    this.getProductsByCategory();
  }

  getProductsByCategory() {
    this.products = [];
    this.isSpinning = true;
    this.adminService.getProductsByCategory(this.categoryId).subscribe(
      (res: any) => {
        res.forEach((element: any) => {
          element.processedImg =
            'data:image/jpeg;base64,' + element.returnedImg;
          this.products.push(element);
        });
        this.filteredProducts = this.products;
        this.isSpinning = false;
      },
      (err: any) => {
        console.log(err);
        this.isSpinning = false;
      });
  }

  filterResults(text: string) {
    console.log('runned');
    
    if (!text) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((category: any) =>
      category?.name?.toLowerCase().includes(text.toLowerCase()));
  }

  onInputChange(text: string){
    if (!text) {
      this.filteredProducts = this.products;
    }
  }

  deleteProduct(productId: number) {
    this.isSpinning = true;
    this.adminService.deleteProduct(productId).subscribe(
      (res: any) => {
        this.isSpinning = false;
        if(res == null) {
          this.getProductsByCategory();
          this.message.success('Product deleted successfully', {nzDuration: 5000})
        }
        else{
          this.message.error('Something went wrong', {nzDuration: 5000})
        }
      },
      (err: any) => {
        console.log(err);
        this.isSpinning = false;
      });
  }
}
