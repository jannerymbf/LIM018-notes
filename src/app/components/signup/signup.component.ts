import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  registerUser(name: string, email: string, pass: string) {
    this.auth.signup(email, pass);
    console.log(email, pass);
    this.auth.updateUser(name);
  }
}
