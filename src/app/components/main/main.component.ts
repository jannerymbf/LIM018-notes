import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  name: string = '';

  getCurrentUser() {
    this.auth.getCurrentUser()
      .then(user => {
        this.name = user.displayName;
      })
      .catch(() => {
        this.name = 'Anonymous';
      })
  }

  signOut() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
