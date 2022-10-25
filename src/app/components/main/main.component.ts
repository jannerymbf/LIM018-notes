import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(private auth: AuthService, private fs: FirestoreService, private router: Router, private renderer: Renderer2) { }

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
        this.showNotes();
      })
      .catch(() => {
        this.name = 'Anonymous';
      })
  }

  users: any[] = [];
  notes: any[] = [];
  note = {title: '', content: ''};
  @ViewChild('addNoteModal') modalAddNote!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('notes') notesDisplayed!: ElementRef;

  getAllUsers() {
    this.fs.getAllUSers().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(element => {
        this.users.push(element.id);
      });
    })
  }

  addNote(title: string, content: string) {
    this.title.nativeElement.value = '';
    this.content.nativeElement.value = '';

    if(this.users.includes(this.uid)) {
      this.fs.updateNote(this.uid, {title: title, content: content})
        .then(() => {
          this.modalAddNote.nativeElement.close();
        })
    } else {
      this.note = {title: title, content: content};
      this.notes.push(this.note);
      this.fs.addNote({id: this.uid, name: this.name, notes: this.notes})
        .then(() => {
          this.modalAddNote.nativeElement.close();
        })
    }
  }

  userNotes: any[] = [];
  titleToBeDisplayed: string = '';
  contentToBeDisplayed: string = '';

  showNotes() {
    this.fs.displayNotes(this.uid).subscribe((e: any) => {
      this.userNotes = e.notes;
      // to display the first note when page first loaded
      this.titleToBeDisplayed = this.userNotes[0].title;
      this.contentToBeDisplayed = this.userNotes[0].content;
    })
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.notesDisplayed.nativeElement, 'click', event => {
      this.titleToBeDisplayed = event.target.parentNode.querySelector('h3').textContent;
      this.contentToBeDisplayed = event.target.parentNode.querySelector('p').textContent;
    });
  }

  signOut() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
