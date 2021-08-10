import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { askForServer, SERVER_URL } from '../constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    if (!SERVER_URL) {
      askForServer('');
    }
  }
}
