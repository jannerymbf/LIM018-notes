import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  confirmInput: boolean = true;

  signIn(email: string, pass: string) {
    if(email === '' || pass === '') {
      this.confirmInput = false;
    } else {
      this.auth.login(email, pass)
        .then((res) => {
          this.router.navigateByUrl('/notes');
        })
        .catch(() => {
          this.confirmInput = false;
        })
    }
  }

  signInWithGoogle() {
    this.auth.loginWithGoogle()
      .then((res) => {
        this.router.navigateByUrl('/notes');
      })
      .catch(() => {
        this.confirmInput = false;
      })
  }
}
