import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [DemoNgZorroAntdModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

}
