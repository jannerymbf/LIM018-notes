import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signIn(email: string, pass: string) {
    this.auth.login(email, pass);
    console.log('Youre in :D')
  }

  signInWithGoogle() {
    this.auth.loginWithGoogle();
    console.log('Youre in :D with Google')
  }
}
