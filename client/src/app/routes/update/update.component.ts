import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { INote } from 'src/app/interface/note';

import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  textButton: string = "UPDATE"
  errorText: string = ""

  noteData: INote = {
    ID: 0,
    title: '',
    description: '',
    created_at: '',
    updated_at: '',
    deleted_at: ''
  }

  constructor(private notesService: NotesService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params
    if(params['id']) {
      this.notesService.note(params['id']).subscribe(
        res => {
          this.noteData.title = res.title
          this.noteData.description = res.description
        },
        err => {
          this.errorText = err.error
          console.log(this.errorText);
        }
      )
    }
  }

  updateANote() {
    delete this.noteData.ID
    delete this.noteData.created_at
    delete this.noteData.updated_at
    delete this.noteData.deleted_at

    const params = this.activatedRoute.snapshot.params
    if(params['id']) {
      this.notesService.updateNote(this.noteData, params['id']).subscribe(
        res => {
          this.route.navigate(['/'])
        },
        err => {
          console.log(err.error);
        }
      )
    }
  }

}
