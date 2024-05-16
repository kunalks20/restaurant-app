import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { CommonModule } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DemoNgZorroAntdModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;
  validateForm!: FormGroup;

  confirmationValidator = (control: FormControl) : { [s: string]: boolean} => {
    if(!control.value){
      return {required: true};
    }
    else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true};
    }
    return {};
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      name:['', Validators.required]
    });
  }
  
  constructor (
    private fb: FormBuilder,
    private service: AuthService,
    private notification: NzNotificationService, 
    private router: Router) {}

  register(){
    console.log("My form", this.validateForm.value);
    this.service.signup(this.validateForm.value).subscribe(
      res => {
        console.log(res);
        if(res.name != ''){
          this.router.navigate(['/login']);
          this.notification.success("SUCCESS", "You're registered successfully", {nzDuration: 5000});
        } else {
          this.notification.error("ERROR", "Something went wrong", {nzDuration: 5000});
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
