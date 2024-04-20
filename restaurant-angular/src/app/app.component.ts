import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DemoNgZorroAntdModule } from './modules/demo-ng-zorro-antd-module.module';
import { StorageService } from './auth-services/storage-service/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemoNgZorroAntdModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restaurant-angular';

  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === 'NavigationEnd') {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    });
  }

  logOut() {
    StorageService.signOut();
    this.router.navigate(['/login']);
  }
}
