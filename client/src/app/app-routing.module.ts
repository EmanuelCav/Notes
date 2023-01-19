import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './routes/create/create.component';
import { NoteComponent } from './routes/note/note.component';
import { NotesComponent } from './routes/notes/notes.component';
import { UpdateComponent } from './routes/update/update.component';

const routes: Routes = [
  {
    path: "",
    component: NotesComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "note/:id",
    component: NoteComponent
  },
  {
    path: "update/:id",
    component: UpdateComponent
  },
  {
    path: '**',
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
