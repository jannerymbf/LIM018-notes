import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  registerUser(name: string, email: string, pass: string) {
    if(name === '' || email === '' || pass === ''){
      console.log('campos vacíos')
    } else {
      this.auth.signup(email, pass)
      .then((resp) => {
        console.log(resp)
        this.auth.updateUser(name);
        this.route.navigateByUrl('/login');
      })
      .catch(() => {
        console.log('Be careful!!')
      })
    }
  }
}
