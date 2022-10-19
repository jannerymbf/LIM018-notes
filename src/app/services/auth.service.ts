import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  currentUser: any; 

  signup(email: string, pass: string) {
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

  async updateUser(name: string) {
    this.currentUser = await this.auth.currentUser; 
    this.currentUser.updateProfile({ displayName: name});
  }

  login(email: string, pass: string) {
    this.auth.signInWithEmailAndPassword(email, pass);
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
