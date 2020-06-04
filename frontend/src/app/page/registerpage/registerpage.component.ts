import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.services';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    document.body.classList.remove ("accueil-bg-img");
    document.body.classList.remove ("capture-bg-img");
    document.body.classList.remove ("équipe-bg-img");
    document.body.classList.remove ("authpage-bg-img");
    document.body.classList.add ("register-bg-img");
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
