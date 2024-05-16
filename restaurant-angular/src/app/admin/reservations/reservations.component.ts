import { Component } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
  isSpinning: boolean = false;
  reservations: any;

  constructor(private service: AdminService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations() {
    this.isSpinning = true;
    this.service.getReservations().subscribe(
      {
        next: (res: any) => {
          this.reservations = res;
          console.log(res);
          
          this.isSpinning = false;
        },
        error: (err: any) => {
          this.isSpinning = false;
          console.log(err);
        }
      }
    );
  }

  changeReservationStatus(id: any, status: string) {
    this.isSpinning = true;
    this.service.changeReservationStatus(id,status).subscribe({
      next:(res:any) => {
        this.isSpinning = false;
        if(res.id != null) {
          this.message.success(`Reservation for table is ${status === 'Approve' ? 'Approved' :'Cancelled'}`, { nzDuration: 5000 });
          this.getAllReservations();
        }
        else{
          this.message.error('Something went wrong', { nzDuration: 5000 });
        }
      },
      error:(err:any) => {
        this.isSpinning = false;
        this.message.error('Something went wrong', { nzDuration: 5000 });
      }
    });
  }
}
