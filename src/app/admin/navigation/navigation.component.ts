import { Component, OnInit } from '@angular/core';
import { faUser, faUserPlus, faUsersCog, faChessKing, faCogs, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  faAdmin = faChessKing;
  faUsers = faUsersCog;
  faListUsers = faUser;
  faAddUser = faUserPlus;
  faCogs = faCogs;
  faEnvelopeSquare = faEnvelopeSquare;

  constructor() { }

  ngOnInit(): void {
  }

}