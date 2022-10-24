import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private auth: AuthService, private fs: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllUsers();
  }

  name: string = '';
  uid: string = '';

  getCurrentUser() {
    this.auth.getCurrentUser()
      .then(user => {
        this.name = user.displayName;
        this.uid = user.uid;
      })
      .catch(() => {
        this.name = 'Anonymous';
      })
  }

  users: any[] = [];
  notes: any[] = [];
  note = {title: '', content: ''};
  @ViewChild('addNoteModal') modalAddNote!: ElementRef;

  getAllUsers() {
    this.fs.getAllUSers().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(element => {
        this.users.push(element.id);
      });
    })
  }

  addNote(title: string, content: string) {
    if(this.users.includes(this.uid)) {
      console.log('Sí está') //not working
    } else {
      this.note = {title: title, content: content};
      this.notes.push(this.note);
      this.fs.addNote({id: this.uid, name: this.name, notes: this.notes})
        .then(() => {
          this.modalAddNote.nativeElement.close();
        })
    }
  }

  signOut() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
