import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  categoryId: any  = this.activatedRoute.snapshot.params['categoryId'];
  filteredProducts: any[] = [];
  products: any[] = [];
  isSpinning: boolean = false;
  size: NzButtonSize = 'large';

  constructor(private activatedRoute: ActivatedRoute,
    private service: CustomerService,
    private message: NzMessageService) { }

    ngOnInit(): void {
      this.getProductsByCategory();
    }

    getProductsByCategory(){
      this.products = [];
      this.isSpinning = true;
      this.service.getProductsByCategory(this.categoryId).subscribe({
        next: (data) => {
          data.forEach((element: any) => {
            element.processedImg =
              'data:image/jpeg;base64,' + element.returnedImg;
            this.products.push(element);
          });
          this.filteredProducts = this.products;
          this.isSpinning = false;
        },
        error: () => {
          this.message.error("Something went wrong", {nzDuration: 5000});
          this.isSpinning = false;
        }
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

}
