import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-reservations',
  standalone: true,
  imports: [DemoNgZorroAntdModule, CommonModule],
  templateUrl: './view-reservations.component.html',
  styleUrl: './view-reservations.component.scss'
})
export class ViewReservationsComponent {
  isSpinning: boolean = false;
  reservations: any[] = [];

  constructor(private service: CustomerService){}

  ngOnInit(){
    this.getReservationsByUser();
  }

  getReservationsByUser(){
    this.isSpinning = true;
    this.service.getReservationsByUser().subscribe(
      {
        next: (data) => {
          this.isSpinning = false;
          this.reservations = data;
        },
        error: (err) => {
          this.isSpinning = false;
          console.log(err);
        }
      });
  }
}
