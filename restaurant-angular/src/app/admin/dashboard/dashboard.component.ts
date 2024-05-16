import { Component } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { RouterModule } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashBoardComponent {
  categories: any = [];
  filteredCategories: any[] = [];

  size: NzButtonSize = 'large';

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categories = [];
    this.service.getAllCategories().subscribe(
      (res) => {
        res.forEach((element: any) => {
          element.processedImg =
            'data:image/jpeg;base64,' + element.returnedImg;
          this.categories.push(element);
        });
        this.filteredCategories = this.categories;
      },
      (err) => {
        console.log(err);
      }
    );
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
