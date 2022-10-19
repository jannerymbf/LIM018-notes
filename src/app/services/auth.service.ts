import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  signup(email:string, pass: string) {
    this.auth.createUserWithEmailAndPassword(email, pass);
  }
  
}
