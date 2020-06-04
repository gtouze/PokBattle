import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.services';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.css']
})
export class AuthpageComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getUser().roles;
    }

    document.body.classList.remove ("accueil-bg-img");
    document.body.classList.remove ("capture-bg-img");
    document.body.classList.remove ("équipe-bg-img");
    document.body.classList.remove ("register-bg-img");
    document.body.classList.add ("authpage-bg-img");

  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
       //this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  
  reloadPage() {
    window.location.reload();
  }

}
