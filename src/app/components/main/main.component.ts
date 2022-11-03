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
        // to prevent users from changinh routes without signing in
        this.router.navigateByUrl('/login');
        // this.name = 'Anonymous';
      })
  }

  users: any[] = [];
  notes: any[] = [];
  note = {title: '', content: ''};
  
  @ViewChild('addNoteModal') modalAddNote!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('notes') notesDisplayed!: ElementRef;
  @ViewChild('btnCloseModal') btnCloseModal!: ElementRef;

  getAllUsers() {
    this.fs.getAllUSers().subscribe(querySnapshot => {
      querySnapshot.docs.forEach(element => {
        this.users.push(element.id);
      });
    })
  }

  editStatus: boolean = false;
  userNotes: any[] = [];
  titleToBeDisplayed: string = '';
  contentToBeDisplayed: string = '';
  

  showModal() {
    this.editStatus = false;
    this.btnCloseModal.nativeElement.textContent = 'Add';
    this.modalAddNote.nativeElement.showModal();
  }

  addNote(title: string, content: string) {
    this.title.nativeElement.value = '';
    this.content.nativeElement.value = '';

    if(this.users.includes(this.uid)) {
      if(this.editStatus) {
        this.fs.updateNote(this.uid, {title: title, content: content})
        .then(() => {
          this.deleteNote();
          this.titleToBeDisplayed = title;
          this.contentToBeDisplayed = content;
          this.modalAddNote.nativeElement.close();
        })
      } else {
        this.fs.updateNote(this.uid, {title: title, content: content})
        .then(() => {
          this.titleToBeDisplayed = title;
          this.contentToBeDisplayed = content;
          this.modalAddNote.nativeElement.close();
        })
      }
    } else {
      this.note = {title: title, content: content};
      this.notes.push(this.note);
      this.fs.addNote({id: this.uid, name: this.name, notes: this.notes})
        .then(() => {
          this.titleToBeDisplayed = title;
          this.contentToBeDisplayed = content;
          this.modalAddNote.nativeElement.close();
        })
    }
  }

  showNotes() {
    this.fs.displayNotes(this.uid).subscribe((e: any) => {
      this.userNotes = e.notes;
      // to display the first note when page first loaded
      // this.titleToBeDisplayed = this.userNotes[0].title;
      // this.contentToBeDisplayed = this.userNotes[0].content;
    })
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllUsers();
    
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.notesDisplayed.nativeElement, 'click', event => {
      this.titleToBeDisplayed = event.target.parentNode.querySelector('h3').textContent;
      this.contentToBeDisplayed = event.target.parentNode.querySelector('p').textContent;
    });
  }

  openModalToModify() {
    this.editStatus = true;
    this.btnCloseModal.nativeElement.textContent = 'Update';
    this.modalAddNote.nativeElement.showModal();
    this.title.nativeElement.value = this.titleToBeDisplayed;
    this.content.nativeElement.value = this.contentToBeDisplayed;
    console.log('Status', this.editStatus);
  }

  deleteNote() {
    this.fs.deleteNote(this.uid, {title: this.titleToBeDisplayed, content: this.contentToBeDisplayed});
    this.titleToBeDisplayed = '';
    this.contentToBeDisplayed = '';
  }

  signOut() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
