import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  showNotes: string = "NOTES"
  createNote: string = "CREATE A NOTE"

  constructor(private route: Router) {
    route.events.subscribe(
      res => {
        const notesNav = document.getElementById("notes-nav")
        const createNav = document.getElementById("create-nav")

        if (this.route.url === "/") {
          notesNav!.style.textDecoration = 'underline'
          createNav!.style.textDecoration = 'none'
        } else if (this.route.url === "/create") {
          notesNav!.style.textDecoration = 'none'
          createNav!.style.textDecoration = 'underline'
        } else {
          notesNav!.style.textDecoration = 'none'
          createNav!.style.textDecoration = 'none'
        }
      }
    )
  }

  ngOnInit(): void {
    const notesNav = document.getElementById("notes-nav")
    const createNav = document.getElementById("create-nav")

    if (this.route.url === "/") {
      notesNav!.style.textDecoration = 'underline'
      createNav!.style.textDecoration = 'none'
    } else if (this.route.url === "/create") {
      notesNav!.style.textDecoration = 'none'
      createNav!.style.textDecoration = 'underline'
    } else {
      notesNav!.style.textDecoration = 'none'
      createNav!.style.textDecoration = 'none'
    }
  }



}
