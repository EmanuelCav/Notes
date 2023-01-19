import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';
;
import { INote } from 'src/app/interface/note';

import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  allNotes: INote[] = []

  constructor(private notesService: NotesService, private route: Router) { }

  ngOnInit(): void {
    this.showNotes()
  }

  showNotes() {    
    this.notesService.notes().subscribe(
      res => {  
        this.allNotes = res
      },
      err => {
        console.log(err);
      }
    )
  }

  getNote(id: number) {
    this.route.navigate([`/note/${id}`])
  }

}
