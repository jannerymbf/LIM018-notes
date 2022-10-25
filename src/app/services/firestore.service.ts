import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // to use arrayUnion
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private fs: AngularFirestore) { }

  addNote(user: User) {
    return this.fs.collection('UserNotes').doc(user.id).set({
      name: user.name,
      notes: user.notes
    })
  }

  getAllUSers() {
    return this.fs.collection('UserNotes').get();
  }

  updateNote(id: string, note: {}) {
    return this.fs.collection('UserNotes').doc(id).update({
      notes: firebase.firestore.FieldValue.arrayUnion(note)
    })
  }

  displayNotes(id: string) {
    return this.fs.collection('UserNotes').doc(id).valueChanges({idField: 'id'});
  }

}
