import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router, private render: Renderer2) { }

  ngOnInit(): void {
  }

  confirmInput: boolean = true;
  @ViewChild('successModal') successModal!: ElementRef;

  registerUser(name: string, email: string, pass: string) {
    if(name === '' || email === '' || pass === ''){
      this.confirmInput = false;
    } else {
      this.auth.signup(email, pass)
      .then((resp) => {
        console.log(resp)
        this.confirmInput = true;
        this.auth.updateUser(name);
        this.successModal.nativeElement.showModal();
      })
      .catch(() => {
        this.confirmInput = false
        console.log('Be careful!!')
      })
    }
  }

  closeModal() {
    this.successModal.nativeElement.close();
    this.route.navigateByUrl('/login');
  }
}
