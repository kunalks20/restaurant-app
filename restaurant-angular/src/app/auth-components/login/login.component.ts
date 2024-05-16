import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterModule
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { StorageService } from '../../auth-services/storage-service/storage.service';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSpinning!: boolean;
  hidePassword = true;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submitForm() {
    this.isSpinning = true;
    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isSpinning = false;
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole,
          };
          console.log(user);
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigate(['/admin']);
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigate(['/customer']);
          } else {
            console.log('Bad Credentials');
          }
        }
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Bad Credentials", {nzDuration: 5000});
      },
    });
  }
}
