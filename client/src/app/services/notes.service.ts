import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { INote } from '../interface/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public api: string = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  notes() {
    return this.http.get<INote[]>(`${this.api}/notes`)
  }
  createNote(noteData: INote) {
    return this.http.post<INote>(`${this.api}/createnote`, noteData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  note(id: number) {
    return this.http.get<INote>(`${this.api}/notes/${id}`)
  }
  removeNote(id: number) {
    return this.http.delete<INote>(`${this.api}/notes/${id}`)
  }
  updateNote(noteData: INote, id: number) {
    return this.http.put<INote>(`${this.api}/notes/${id}`, noteData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

}
