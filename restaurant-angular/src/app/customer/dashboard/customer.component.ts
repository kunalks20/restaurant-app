import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AdminService } from '../../admin/admin-service/admin.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../customer.service';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DemoNgZorroAntdModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class DashBoardComponent {

  categories: any = [];
  isSpinning: boolean = false;
  filteredCategories: any[] = [];
  size: NzButtonSize = 'large';

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categories = [];
    this.service.getAllCategories().subscribe({
      next:(res) => {
        res.forEach((element: any) => {
          element.processedImg =
            'data:image/jpeg;base64,' + element.returnedImg;
          this.categories.push(element);
        });
        this.filteredCategories = this.categories;
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredCategories = this.categories;
      return;
    }

    this.filteredCategories = this.categories.filter((category: any) =>
      category?.name?.toLowerCase().includes(text.toLowerCase()));
  }

  onInputChange(text: string){
    if (!text) {
      this.filteredCategories = this.categories;
    }
  }

}