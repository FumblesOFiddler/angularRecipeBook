import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedPage: string = 'recipe';

  onNavigation(selectedHeader: string) {
    this.selectedPage = selectedHeader;
  }

  ngOnInit() {
    firebase.initializeApp({apiKey: "AIzaSyCFicvBtA_9vquAgsFFE0YVcAEyRBvz-NY",
      authDomain: "recipe-book-jc.firebaseapp.com"});  // Get from firebase dashboard
  }
}
