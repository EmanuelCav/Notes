import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { INote } from 'src/app/interface/note';

import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  textButton: string = "CREATE"

  errorText: string = ""

  noteData: INote = {
    ID: 0,
    title: '',
    description: '',
    created_at: '',
    updated_at: '',
    deleted_at: null
  }

  constructor(private notesService: NotesService, private route: Router) { }

  ngOnInit(): void {
  }

  createANote() {
    delete this.noteData.ID
    delete this.noteData.created_at
    delete this.noteData.updated_at
    delete this.noteData.deleted_at

    this.notesService.createNote(this.noteData).subscribe(
      res => {
        this.route.navigate(["/"])
      },
      err => {
        this.errorText = err.error
        console.log(this.errorText);
      }
    )
  }

}
