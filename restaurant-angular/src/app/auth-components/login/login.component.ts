import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { DemoNgZorroAntdModule } from '../../modules/demo-ng-zorro-antd-module.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { StorageService } from '../../auth-services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  isSpinning!: boolean;
  hidePassword = true;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        console.log(user);
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if(StorageService.isAdminLoggedIn()){
          this.router.navigate(['/admin']);
        }else if(StorageService.isCustomerLoggedIn()){
          this.router.navigate(['/customer']);
        } else{
          console.log("Bad Credentials");
        }
      }
      else{
        console.log("Bad Credentials");
        
      }
    })
    
  }

}
