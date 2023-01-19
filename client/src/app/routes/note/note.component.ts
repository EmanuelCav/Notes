import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { INote } from 'src/app/interface/note';

import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  remove: string = "REMOVE"
  update: string = "UPDATE"

  note: INote = {
    ID: 0,
    title: '',
    description: '',
    created_at: '',
    updated_at: '',
    deleted_at: null
  }

  constructor(private notesService: NotesService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.getNote()
  }

  getNote() {
    const params = this.activatedRoute.snapshot.params
    if (params['id']) {
      this.notesService.note(params['id']).subscribe(
        res => {
          this.note.ID = res.ID,
            this.note.title = res.title,
            this.note.description = res.description,
            this.note.created_at = res.created_at,
            this.note.updated_at = res.updated_at
          this.note.deleted_at = res.deleted_at
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  updateNote(id: number) {
    this.route.navigate([`/update/${id}`])
  }

  removeNote(id: number) {
    const c = confirm("Are you sure you want to delete this note?")
    if (c) {
      this.notesService.removeNote(id).subscribe(
        res => {
          this.route.navigate(['/'])
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
