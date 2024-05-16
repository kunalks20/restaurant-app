import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule, ReactiveFormsModule],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss'
})
export class CreateReservationComponent {
  isSpinning: boolean = false
  tableTypes: any[] = [
    'Standard Table',
    'Booth',
    'Communal Table',
    'Bar Table',
    'Outdoor Table',
    'High-top Table',
    'Banquet Table',
    'Corner Table',
    'Private Dining Table',
    'Round Table'
  ];
  validateForm!: FormGroup

  constructor(private fb: FormBuilder,
    private service: CustomerService,
    private message: NzMessageService
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      tableType:['', Validators.required],
      dateTime:['', Validators.required],
      description:['', Validators.required]
    });
  }

  createReservation(){
    this.isSpinning = true;
    this.service.createReservation(this.validateForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isSpinning = false;
        if(data.id != null){
          this.message.success('Reservation created successfully', {nzDuration: 5000});
        }else{
          this.message.error('Something went wrong', {nzDuration: 5000});
        }
      },
      error: (err) => {
        console.log(err);
        this.isSpinning = false;
      }
    });
  }


}
