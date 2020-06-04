import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    document.body.classList.remove('combat-bg-img');
    document.body.classList.remove ("capture-bg-img");
    document.body.classList.remove ("équipe-bg-img");
    document.body.classList.remove ("register-bg-img");
    document.body.classList.remove ("authpage-bg-img");
    document.body.classList.add ("accueil-bg-img");
  }

}
